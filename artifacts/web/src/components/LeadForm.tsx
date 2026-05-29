import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { useCreateLead, useTrackEvent } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { trackEventObj } from "@/lib/analytics";
import { ArrowRight, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const formSchema = z.object({
  // Step 1
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").or(z.literal("")).optional(),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  contactPreference: z.string().optional(),
  bestContactTime: z.string().optional(),
  
  // Step 2
  veteranStatus: z.string().optional(),
  branch: z.string().optional(),
  beneficiaryType: z.string().optional(),
  reasonForInterest: z.string().optional(),

  // Step 3
  productInterest: z.string().optional(),
  desiredCoverageRange: z.string().optional(),
  existingCoverage: z.string().optional(),
  wantsPolicyReview: z.string().optional(),

  // Step 4
  ageRange: z.string().optional(),
  tobaccoStatus: z.string().optional(),
  generalHealthRange: z.string().optional(),
  comfortWithCall: z.string().optional(),
  
  consentContact: z.boolean().refine(val => val === true, {
    message: "You must agree to be contacted to submit this form.",
  }),
  company: z.string().optional() // Honeypot
});

const CONSENT_TEXT = "By submitting this form, I agree that Honor First Life / Jesse Reiter may contact me by phone, text, or email about my request. Message and data rates may apply. I understand this is a private insurance inquiry and not a VA or government program. I can opt out of text messages by replying STOP.";

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const createLeadMutation = useCreateLead();
  const trackEventApi = useTrackEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      state: "",
      zip: "",
      consentContact: false,
      company: ""
    },
  });

  // Track form start on first interaction
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change' && !form.formState.isDirty) {
         trackEventObj("form_start");
         trackEventApi.mutate({ data: { eventType: "form_start" }});
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form.formState.isDirty]);

  const validateStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["firstName", "lastName", "phone", "state", "zip"];
    // Optional steps don't strictly require validation to proceed, but we could enforce them
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      trackEventObj(`form_step_${step}_complete`);
      trackEventApi.mutate({ data: { eventType: `form_step_${step}_complete` }});
      setStep(s => Math.min(s + 1, 4));
      window.scrollTo({ top: document.getElementById('lead-form-container')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.company) {
      // Honeypot caught something
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    
    trackEventObj("form_submit");
    trackEventApi.mutate({ data: { eventType: "form_submit" }});

    createLeadMutation.mutate(
      { 
        data: {
          ...values,
          consentText: CONSENT_TEXT,
          landingPage: window.location.href,
          referrer: document.referrer,
          utmSource: urlParams.get('utm_source') || undefined,
          utmMedium: urlParams.get('utm_medium') || undefined,
          utmCampaign: urlParams.get('utm_campaign') || undefined,
          utmContent: urlParams.get('utm_content') || undefined,
          utmTerm: urlParams.get('utm_term') || undefined,
          gclid: urlParams.get('gclid') || undefined,
          gbraid: urlParams.get('gbraid') || undefined,
          wbraid: urlParams.get('wbraid') || undefined,
          fbclid: urlParams.get('fbclid') || undefined,
          msclkid: urlParams.get('msclkid') || undefined,
          deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        } 
      },
      {
        onSuccess: () => {
          setLocation("/thank-you");
        },
        onError: () => {
          toast({
            title: "Error submitting form",
            description: "Please try again or call us directly.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <div id="lead-form-container" className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-navy p-6 text-white">
        <h2 className="text-2xl font-serif font-bold mb-2">Check My Options</h2>
        <div className="flex items-center justify-between text-sm">
          <span>Step {step} of 4</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-gold' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot */}
            <div className="absolute left-[-9999px] top-[-9999px]">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
            </div>

            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-navy font-serif mb-4">Where should Jesse send the information?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem><FormLabel>First Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem><FormLabel>Last Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl>
                        <SelectContent>{US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem><FormLabel>ZIP Code *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="contactPreference" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="How should we contact you?" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Call">Call</SelectItem>
                          <SelectItem value="Text">Text</SelectItem>
                          <SelectItem value="Either">Either</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="bestContactTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best Time to Contact</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select best time" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Morning">Morning</SelectItem>
                          <SelectItem value="Afternoon">Afternoon</SelectItem>
                          <SelectItem value="Evening">Evening</SelectItem>
                          <SelectItem value="ASAP">As soon as possible</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-navy font-serif mb-4">Tell us about your service and family</h3>
                
                <FormField control={form.control} name="veteranStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veteran Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes, I am a veteran</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Spouse or family member of a veteran">Spouse or family member of a veteran</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="branch" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch of Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Army">Army</SelectItem>
                        <SelectItem value="Navy">Navy</SelectItem>
                        <SelectItem value="Air Force">Air Force</SelectItem>
                        <SelectItem value="Marines">Marines</SelectItem>
                        <SelectItem value="Coast Guard">Coast Guard</SelectItem>
                        <SelectItem value="Space Force">Space Force</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="beneficiaryType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Who are you looking to protect? (Beneficiary)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select beneficiary" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Child or children">Child or children</SelectItem>
                        <SelectItem value="Family member">Family member</SelectItem>
                        <SelectItem value="Estate or final expenses">Estate or final expenses</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="reasonForInterest" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What made you look into this today?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="cover funeral/final expenses">Cover funeral/final expenses</SelectItem>
                        <SelectItem value="leave money behind">Leave money behind for family</SelectItem>
                        <SelectItem value="review coverage I already have">Review coverage I already have</SelectItem>
                        <SelectItem value="mortgage protection">Mortgage protection</SelectItem>
                        <SelectItem value="understand my options">Just want to understand my options</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-navy font-serif mb-4">What kind of coverage are you looking for?</h3>
                
                <FormField control={form.control} name="productInterest" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select product type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Final expense/burial">Final expense/burial</SelectItem>
                        <SelectItem value="Whole life">Whole life</SelectItem>
                        <SelectItem value="Term life">Term life</SelectItem>
                        <SelectItem value="Mortgage protection">Mortgage protection</SelectItem>
                        <SelectItem value="IUL/cash value">IUL/cash value</SelectItem>
                        <SelectItem value="Policy review/replace">Policy review/replace</SelectItem>
                        <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="desiredCoverageRange" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Coverage Amount</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="$5,000-$10,000">$5,000-$10,000</SelectItem>
                        <SelectItem value="$10,000-$25,000">$10,000-$25,000</SelectItem>
                        <SelectItem value="$25,000-$50,000">$25,000-$50,000</SelectItem>
                        <SelectItem value="$50,000+">$50,000+</SelectItem>
                        <SelectItem value="Not sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.watch("desiredCoverageRange") === "$50,000+" && (
                      <p className="text-sm text-trustblue bg-blue-50 p-3 rounded-md mt-2">
                        Coverage availability depends on age, health, state, product, carrier, and underwriting. Jesse will help review realistic options.
                      </p>
                    )}
                  </FormItem>
                )} />

                <FormField control={form.control} name="existingCoverage" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you currently have life insurance?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select option" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Not sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="wantsPolicyReview" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Would you like Jesse to review your existing policy to ensure it's still right for you?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select option" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Maybe">Maybe</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-navy font-serif mb-4">Basic Eligibility Info</h3>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6 flex gap-3 text-sm text-amber-800">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-amber-600" />
                  <p>Do not enter Social Security numbers, banking information, payment information, VA claim numbers, Medicare numbers, or full medical history into this form. Jesse will review any application details directly with you if you decide to move forward.</p>
                </div>

                <FormField control={form.control} name="ageRange" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Age Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select age range" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Under 40">Under 40</SelectItem>
                        <SelectItem value="40-49">40-49</SelectItem>
                        <SelectItem value="50-59">50-59</SelectItem>
                        <SelectItem value="60-69">60-69</SelectItem>
                        <SelectItem value="70-79">70-79</SelectItem>
                        <SelectItem value="80+">80+</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="generalHealthRange" render={({ field }) => (
                  <FormItem>
                    <FormLabel>General Health</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select health status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Generally healthy">Generally healthy</SelectItem>
                        <SelectItem value="Some health conditions">Some health conditions</SelectItem>
                        <SelectItem value="Serious or recent health issues">Serious or recent health issues</SelectItem>
                        <SelectItem value="Prefer to discuss by phone">Prefer to discuss by phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="tobaccoStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you use tobacco products?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select tobacco status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="Prefer to discuss by phone">Prefer to discuss by phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="comfortWithCall" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you comfortable receiving a phone call from Jesse?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select option" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Yes call me">Yes, call me</SelectItem>
                        <SelectItem value="Text me first">Text me first</SelectItem>
                        <SelectItem value="I want to schedule a time">I want to schedule a time</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <div className="pt-4 border-t border-gray-100">
                  <FormField control={form.control} name="consentContact" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50 border">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormDescription
                          className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                          onClick={(e) => {
                            if ((e.target as HTMLElement).tagName !== "A") {
                              field.onChange(!field.value);
                            }
                          }}
                        >
                          {CONSENT_TEXT} <a href="/privacy-policy" target="_blank" className="underline hover:text-navy">Privacy Policy</a> and <a href="/terms" target="_blank" className="underline hover:text-navy">Terms</a>.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(s => s - 1)} className="text-navy">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              ) : <div></div>}
              
              {step < 4 ? (
                <Button type="button" onClick={validateStep} className="bg-gold hover:bg-gold/90 text-navy font-bold px-8">
                  Next Step <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={createLeadMutation.isPending} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 text-lg py-6 h-auto">
                  {createLeadMutation.isPending ? (
                    <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Submitting...</>
                  ) : (
                    <><ShieldCheck className="h-5 w-5 mr-2" /> Request Review</>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
