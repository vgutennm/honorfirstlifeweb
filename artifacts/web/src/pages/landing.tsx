import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadForm } from "@/components/LeadForm";
import { useSeo } from "@/lib/seo";
import { Shield, ShieldCheck, HeartPulse, FileText, Home, ArrowRight, PlayCircle, Phone, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

export default function Landing() {
  useSeo("Veteran Life Insurance & Final Expense Options | Honor First Life", "Simple, respectful life insurance guidance for veterans and families. Review final expense, whole life, term life, mortgage protection, and policy review options with a licensed professional. Not affiliated with the VA or government.");

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy text-white pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <img src="/hero.png" alt="Older couple reviewing paperwork" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6 text-gold">
                <ShieldCheck className="h-4 w-4" /> Private life insurance guidance
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
                Veteran Life Insurance <span className="text-gold">Made Simple</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Protect your family from funeral costs, final expenses, and leftover bills with clear, respectful guidance from a licensed life insurance professional.
              </p>
              
              <div className="flex flex-col gap-4 mb-8 text-sm font-medium">
                <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-gold" /> Veteran-focused guidance & support</div>
                <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-gold" /> Private life insurance options</div>
                <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-gold" /> Day-one coverage options may be available</div>
                <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-gold" /> No-pressure review with a licensed professional</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 text-lg h-auto" onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Check My Options
                </Button>
                <div className="flex gap-2">
                  <a href="tel:1-800-555-0199" className="flex-1 sm:flex-none flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 transition-colors py-6 px-6 rounded-md font-bold">
                    <Phone className="h-5 w-5 sm:mr-2" /> <span className="hidden sm:inline">Call Jesse Now</span>
                  </a>
                  <a href="sms:1-800-555-0199" className="flex-1 sm:flex-none flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 transition-colors py-6 px-6 rounded-md font-bold">
                    <MessageSquare className="h-5 w-5 sm:mr-2" /> <span className="hidden sm:inline">Text Jesse</span>
                  </a>
                </div>
              </div>
              
              <p className="text-xs text-white/50 mt-6 max-w-md">
                Not affiliated with the VA, U.S. government, or any military branch. No Social Security number, banking information, or payment information is collected on this website.
              </p>
            </div>
            
            <div className="lg:pl-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none"></div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">See what options may be available for you</h3>
                <p className="text-white/80 mb-6">Answer a few simple questions to help Jesse review your private life insurance options.</p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-6 text-lg" onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Start Review <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-b py-6 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm font-medium text-navy">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-trustblue" /> Licensed guidance</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-trustblue" /> Multiple carrier options</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-trustblue" /> No-pressure conversation</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-trustblue" /> Private company, not VA</span>
          </div>
        </div>
      </section>

      {/* Emotional Problem Section */}
      <section className="py-20 bg-softgray">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-6">You served your country. Now make sure your family is not left guessing.</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            The loss of a loved one is hard enough. But when a spouse or children are left scrambling to figure out how to pay for funeral costs, debts, or final expenses, that grief is compounded by financial stress. 
            <br/><br/>
            A proper private life insurance policy ensures that the people you love have the funds they need, exactly when they need them—without the hassle, delays, or red tape.
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto mb-10 text-left">
            <h3 className="font-bold text-lg text-navy mb-4">Do you know the answers to these questions?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3"><span className="text-gold font-bold">•</span> How much will your final expenses actually cost?</li>
              <li className="flex gap-3"><span className="text-gold font-bold">•</span> Will your current coverage (if any) pay out fast enough to cover a funeral?</li>
              <li className="flex gap-3"><span className="text-gold font-bold">•</span> Does your existing policy expire, or do the premiums increase as you age?</li>
            </ul>
          </div>
          
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 text-lg h-auto shadow-md" onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Check My Options
          </Button>
        </div>
      </section>

      {/* What This Helps With */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">What This Helps With</h2>
            <p className="text-lg text-muted-foreground">Private life insurance isn't a one-size-fits-all product. Jesse helps review options for different needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-softgray rounded-xl p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-blue-100 text-trustblue rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl text-navy mb-3">Final Expense</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Small, permanent policies designed specifically to cover burial, cremation, and funeral costs so your family isn't left with a bill.
              </p>
            </div>
            
            <div className="bg-softgray rounded-xl p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-red-100 text-destructive rounded-lg flex items-center justify-center mb-6">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl text-navy mb-3">Family Protection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Term or whole life coverage that replaces lost income, ensuring your spouse can maintain their standard of living.
              </p>
            </div>

            <div className="bg-softgray rounded-xl p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-amber-100 text-gold rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl text-navy mb-3">Policy Review</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A review of your existing coverage to check for expiring terms, increasing premiums, or gaps you might not know about.
              </p>
            </div>

            <div className="bg-softgray rounded-xl p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mb-6">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl text-navy mb-3">Mortgage Protection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Coverage designed to pay off your mortgage if you pass away, allowing your family to keep their home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Is / Is Not */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6 text-gold flex items-center gap-3">
                <ShieldCheck className="h-6 w-6" /> What This Is
              </h2>
              <ul className="space-y-4 text-white/90">
                <li className="flex gap-3"><span className="text-gold font-bold">✓</span> A private review of your life insurance options</li>
                <li className="flex gap-3"><span className="text-gold font-bold">✓</span> A way to compare private products from different carriers</li>
                <li className="flex gap-3"><span className="text-gold font-bold">✓</span> A respectful conversation with a licensed professional</li>
                <li className="flex gap-3"><span className="text-gold font-bold">✓</span> A place to ask questions without pressure</li>
                <li className="flex gap-3"><span className="text-gold font-bold">✓</span> A way to review coverage you might already have</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6 text-red-400 flex items-center gap-3">
                <ShieldAlert className="h-6 w-6" /> What This Is NOT
              </h2>
              <ul className="space-y-4 text-white/80">
                <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span> Not the VA, the government, or any military branch</li>
                <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span> Not a guaranteed approval program</li>
                <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span> Not a promise of a specific rate or price</li>
                <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span> Not a spammy lead marketplace that will sell your info</li>
                <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span> Not an instant policy application</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Placeholders) */}
      <section className="py-20 bg-softgray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy text-center mb-12">What Families Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                  Placeholder
                </div>
                <div className="flex text-gold mb-4">
                  {"★★★★★"}
                </div>
                <p className="text-muted-foreground italic mb-6">"Placeholder text. This will be replaced with an approved, real testimonial from a satisfied client regarding Jesse's respectful approach."</p>
                <p className="font-bold text-navy text-sm">— Client Name {i}, State</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Jesse */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-softgray rounded-2xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img src="/jesse.png" alt="Jesse Reiter" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent lg:hidden"></div>
                <div className="absolute bottom-4 left-4 lg:hidden">
                  <h3 className="text-2xl font-serif font-bold text-white">Jesse Reiter</h3>
                  <p className="text-white/90 text-sm">Licensed Life Insurance Professional</p>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="hidden lg:block mb-6">
                  <h3 className="text-3xl font-serif font-bold text-navy mb-1">Meet Jesse Reiter</h3>
                  <p className="text-muted-foreground font-medium">Licensed Life Insurance Professional</p>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I believe that getting life insurance shouldn't feel like a high-pressure sales pitch. You deserve clear, honest answers about what options are available to protect your family from the burden of final expenses. My goal is to review your specific situation and find private coverage options that actually make sense for you.
                </p>

                <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6 space-y-2 text-sm text-navy">
                  <p className="font-semibold text-trustblue mb-3 border-b pb-2">Licensing Information</p>
                  <p><span className="font-medium text-muted-foreground">National Producer Number (NPN):</span> [Placeholder]</p>
                  <p><span className="font-medium text-muted-foreground">Licensed in:</span> NJ, FL, IN, MS, OH, OR, WA, CA, TN, VA</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">Services are available only where Jesse Reiter is properly licensed and appointed.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:1-800-555-0199" className="flex items-center justify-center gap-2 bg-white border-2 border-navy text-navy hover:bg-gray-50 px-6 py-3 rounded-md font-bold transition-colors">
                    <Phone className="h-4 w-4" /> Save Jesse's Number
                  </a>
                  <a href="mailto:jesse@honorfirstlife.com" className="flex items-center justify-center gap-2 text-trustblue hover:text-navy font-medium">
                    Email Jesse
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">How the Private Review Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-lg font-serif mt-1">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Answer a few questions</h3>
                <p className="text-white/80">Use the form below to provide basic information about your age, health, and what you're looking for. No sensitive data like SSNs or banking info required.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-lg font-serif mt-1">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Jesse reviews your info</h3>
                <p className="text-white/80">Jesse will look at your details to determine which private insurance carriers and products you might qualify for.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-lg font-serif mt-1">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Talk through your options</h3>
                <p className="text-white/80">Jesse will call or text you to discuss what he found. You'll get clear numbers and straight answers, not a high-pressure pitch.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-lg font-serif mt-1">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Apply only if it makes sense</h3>
                <p className="text-white/80">If you find a policy that fits your budget and needs, Jesse will help you complete the formal application directly with the carrier.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-20 bg-softgray">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">Request Your Private Review</h2>
            <p className="text-lg text-muted-foreground">Complete this brief form to see what coverage options may be available to you.</p>
          </div>
          
          <LeadForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold text-navy text-center mb-10">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-navy">Are you affiliated with the VA?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                No. Honor First Life is a private commercial resource operated by Jesse Reiter, a licensed life insurance professional. We do not offer or administer government benefits. We help veterans and their families navigate private commercial life insurance options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-navy">Do I have to answer medical questions?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                It depends on the policy. Some final expense policies require no medical exams, just a few health questions. Other policies might require more details. Jesse can help you find options that fit your specific health situation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-navy">Will my rates go up as I get older?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                If you select a whole life or final expense policy, the premiums are typically locked in for life. If you choose a term policy, the rates will increase or the policy will expire after the term ends. Jesse will clearly explain the difference during your review.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-navy">Can I get coverage if I have health issues?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Often, yes. While coverage and approval depend on the carrier and underwriting, there are many products specifically designed for individuals with pre-existing health conditions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-bold text-navy">Is my information safe?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes. We only collect the basic information needed to run quotes and contact you. We do not ask for or store Social Security numbers, banking details, or full medical histories on this website, and we do not sell your data to spammy lead lists.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-bold text-navy">Am I obligated to buy anything?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Absolutely not. This is a free, no-pressure review. If you don't like the options or pricing, you simply walk away.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left font-bold text-navy">How long does it take for a policy to pay out?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Once a valid claim is filed with the necessary documentation (like a death certificate), many final expense policies aim to pay out within a few days to a few weeks, depending on the carrier and the circumstances of the claim.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </PublicLayout>
  );
}

// Simple button component that isn't dependent on form logic
function Button({ children, className, onClick, ...props }: any) {
  return (
    <button 
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

function ShieldAlert(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
}
