import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { useCreateLead } from "@workspace/api-client-react";
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
import { useTrack } from "@/hooks/use-track";
import { site, formDisclaimer } from "@/lib/site";
import { ArrowRight, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const formSchema = z.object({
  // Step 1 — quick quote check
  ageRange: z.string().min(1, "Please select an age range"),
  tobaccoStatus: z.string().min(1, "Please select an option"),
  desiredCoverageRange: z.string().min(1, "Please select a coverage amount"),

  // Step 2 — contact details
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").or(z.literal("")).optional(),
  state: z.string().min(2, "State is required"),
  bestContactTime: z.string().optional(),

  consentContact: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted to submit this form.",
  }),
  company: z.string().optional(), // Honeypot
});

const CONSENT_TEXT = `By submitting this form, I agree that ${site.brand} / ${site.agent.name} may contact me by phone, text, or email about my request. Message and data rates may apply. I understand this is a private insurance inquiry and not a VA or government program. I can opt out of texts by replying STOP.`;

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createLeadMutation = useCreateLead();
  const track = useTrack();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageRange: "",
      tobaccoStatus: "",
      desiredCoverageRange: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      state: "",
      bestContactTime: "",
      consentContact: false,
      company: "",
    },
  });

  // Track form start on first interaction.
  useEffect(() => {
    const subscription = form.watch((_value, { type }) => {
      if (type === "change" && !form.formState.isDirty) {
        track("form_start");
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch, form.formState.isDirty]);

  const goToStepTwo = async () => {
    const isValid = await form.trigger([
      "ageRange",
      "tobaccoStatus",
      "desiredCoverageRange",
    ]);
    if (isValid) {
      track("form_step_1_complete");
      setStep(2);
      window.scrollTo({
        top: document.getElementById("lead-form-container")?.offsetTop || 0,
        behavior: "smooth",
      });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.company) {
      // Honeypot caught a bot submission — silently discard.
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    track("click_get_quote_form");
    track("form_submit");

    createLeadMutation.mutate(
      {
        data: {
          ...values,
          consentText: CONSENT_TEXT,
          landingPage: window.location.href,
          referrer: document.referrer,
          utmSource: urlParams.get("utm_source") || undefined,
          utmMedium: urlParams.get("utm_medium") || undefined,
          utmCampaign: urlParams.get("utm_campaign") || undefined,
          utmContent: urlParams.get("utm_content") || undefined,
          utmTerm: urlParams.get("utm_term") || undefined,
          gclid: urlParams.get("gclid") || undefined,
          gbraid: urlParams.get("gbraid") || undefined,
          wbraid: urlParams.get("wbraid") || undefined,
          fbclid: urlParams.get("fbclid") || undefined,
          msclkid: urlParams.get("msclkid") || undefined,
          deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
        },
      },
      {
        onSuccess: () => {
          setLocation("/thank-you");
        },
        onError: () => {
          toast({
            title: "Error submitting form",
            description: "Please try again or call us directly.",
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <div id="lead-form-container" className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-navy p-6 text-white">
        <h2 className="text-2xl font-serif font-bold mb-2">
          {step === 1 ? "Start With a Quick Quote Check" : "Where Should Jesse Send Your Options?"}
        </h2>
        <div className="flex items-center justify-between text-sm">
          <span>Step {step} of 2</span>
          <div className="flex gap-1">
            {[1, 2].map((i) => (
              <div key={i} className={`h-1.5 w-10 rounded-full ${i <= step ? "bg-gold" : "bg-white/20"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot */}
            <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
            </div>

            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <FormField control={form.control} name="ageRange" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Range *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select age range" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Under 40">Under 40</SelectItem>
                        <SelectItem value="40 to 49">40 to 49</SelectItem>
                        <SelectItem value="50 to 59">50 to 59</SelectItem>
                        <SelectItem value="60 to 69">60 to 69</SelectItem>
                        <SelectItem value="70 to 79">70 to 79</SelectItem>
                        <SelectItem value="80 plus">80 plus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="tobaccoStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tobacco Use *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="Prefer to discuss">Prefer to discuss</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="desiredCoverageRange" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coverage Amount *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select coverage amount" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="$5,000 to $10,000">$5,000 to $10,000</SelectItem>
                        <SelectItem value="$10,000 to $25,000">$10,000 to $25,000</SelectItem>
                        <SelectItem value="$25,000 to $50,000">$25,000 to $50,000</SelectItem>
                        <SelectItem value="$50,000 plus">$50,000 plus</SelectItem>
                        <SelectItem value="Not sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <p className="text-xs text-muted-foreground">
                  Prefer to talk first? You can call or text {site.agent.name.split(" ")[0]} directly using the buttons on this page.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem><FormLabel>First Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem><FormLabel>Last Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl>
                        <SelectContent>{US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="bestContactTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best Time to Contact</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select best time" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="ASAP">ASAP</SelectItem>
                          <SelectItem value="Morning">Morning</SelectItem>
                          <SelectItem value="Afternoon">Afternoon</SelectItem>
                          <SelectItem value="Evening">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>

                <div className="pt-2">
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

                <p className="text-xs text-muted-foreground leading-relaxed">{formDisclaimer}</p>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="text-navy">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              ) : <div></div>}

              {step === 1 ? (
                <Button type="button" onClick={goToStepTwo} className="bg-gold hover:bg-gold/90 text-navy font-bold px-8">
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={createLeadMutation.isPending} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 text-lg py-6 h-auto">
                  {createLeadMutation.isPending ? (
                    <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Submitting...</>
                  ) : (
                    <><ShieldCheck className="h-5 w-5 mr-2" /> Get My Quote</>
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
