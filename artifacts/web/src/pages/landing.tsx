import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadForm } from "@/components/LeadForm";
import { useSeo } from "@/lib/seo";
import { useTrack } from "@/hooks/use-track";
import {
  site,
  hero,
  cta,
  trustBadges,
  benefits,
  products,
  howItWorks,
  whyChoose,
  testimonialPlaceholders,
  faqs,
  disclosures,
} from "@/lib/site";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Eye,
  HandHeart,
  Users,
  Phone,
  MessageSquare,
  Mail,
  ArrowRight,
  IdCard,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TRUST_ICONS = [ShieldCheck, Shield, Lock, Eye, HandHeart, Users];

function scrollToForm() {
  document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
}

export default function Landing() {
  useSeo(
    `Veteran Life Insurance & Final Expense Options | ${site.brand}`,
    "Simple, respectful life insurance guidance for veterans and families. Call, text, or request a private review of final expense, whole life, IUL, mortgage protection, and policy review options with a licensed professional. Not affiliated with the VA or government.",
    { path: "/" },
  );

  const track = useTrack();

  // Reusable CTA group. `where` distinguishes the tracking event source.
  const CtaGroup = ({
    where,
    variant = "light",
  }: {
    where: "hero" | "final_cta";
    variant?: "light" | "dark";
  }) => {
    const callEvent =
      where === "hero" ? "click_to_call_hero" : "click_to_call_final_cta";
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`tel:${site.phoneTel}`}
          onClick={() => track(callEvent)}
          className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold py-4 px-7 rounded-md text-lg shadow-md transition-colors"
        >
          <Phone className="h-5 w-5" /> {cta.callNow}
        </a>
        <button
          onClick={scrollToForm}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-4 px-7 rounded-md text-lg shadow-md transition-colors"
        >
          {cta.checkOptions} <ArrowRight className="h-5 w-5" />
        </button>
        <a
          href={`sms:${site.phoneSms}`}
          onClick={() => track("click_to_text")}
          className={`flex items-center justify-center gap-2 font-bold py-4 px-7 rounded-md text-lg transition-colors border-2 ${
            variant === "dark"
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-navy text-navy hover:bg-navy/5 bg-white"
          }`}
        >
          <MessageSquare className="h-5 w-5" /> {cta.textJesse}
        </a>
      </div>
    );
  };

  return (
    <PublicLayout>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-navy text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="absolute inset-0 z-0">
          <img src="/hero.png" alt="Veteran and family reviewing options together" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6 text-gold">
                <ShieldCheck className="h-4 w-4" /> {hero.eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-5">
                {hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-5 leading-relaxed">
                {hero.subheadline}
              </p>
              <p className="text-base md:text-lg text-gold font-semibold mb-8 leading-relaxed">
                {hero.callLine}
              </p>

              <CtaGroup where="hero" variant="dark" />

              <p className="text-sm text-white/70 mt-6 max-w-md">{hero.trustLine}</p>
              <p className="text-xs text-white/50 mt-2 max-w-md">{hero.microTrust}</p>
            </div>

            {/* Hero form */}
            <div id="form-section" className="lg:pl-4 scroll-mt-20">
              <div className="text-center lg:text-left mb-4">
                <h2 className="text-2xl font-serif font-bold text-white">{hero.formHeadline}</h2>
                <p className="text-white/80 text-sm mt-1">{hero.formSubheadline}</p>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust badges / licensing strip */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm font-medium text-navy">
            {trustBadges.map((badge, i) => {
              const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
              return (
                <span key={badge} className="flex items-center gap-2 justify-center lg:justify-start text-center lg:text-left">
                  <Icon className="h-4 w-4 text-trustblue shrink-0" /> {badge}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Benefits */}
      <section className="py-16 lg:py-20 bg-softgray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
              Why Veterans and Families Look Into Life Insurance
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 border border-gray-100 transition-all hover:shadow-md">
                <div className="h-12 w-12 bg-blue-50 text-trustblue rounded-lg flex items-center justify-center mb-5">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-navy mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Product explanation */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
              Life Insurance Options Jesse Can Help You Review
            </h2>
            <p className="text-lg text-muted-foreground">
              A simple overview of the main product categories — no pressure, just clear information.
            </p>
          </div>
          <div className="space-y-5">
            {products.map((p) => (
              <div key={p.title} className="bg-softgray rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-xl text-navy mb-2">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.body}</p>
                {p.disclosure && (
                  <p className="text-sm text-navy/80 bg-white border-l-4 border-gold p-3 rounded mt-4 leading-relaxed">
                    {p.disclosure}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="py-16 lg:py-20 bg-navy text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            How the Private Review Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howItWorks.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-lg font-serif mt-1">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-white/80">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why choose HonorFirstLife / Jesse */}
      <section className="py-16 lg:py-20 bg-softgray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
              Why Speak With Jesse?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((w) => (
              <div key={w.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-lg text-navy mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-gold shrink-0" /> {w.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Meet Jesse */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-softgray rounded-2xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[20rem]">
                <img src={site.agent.headshot} alt={site.agent.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent lg:hidden"></div>
                <div className="absolute bottom-4 left-4 lg:hidden">
                  <h3 className="text-2xl font-serif font-bold text-white">{site.agent.name}</h3>
                  <p className="text-white/90 text-sm">{site.agent.title}</p>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="hidden lg:block mb-6">
                  <h3 className="text-3xl font-serif font-bold text-navy mb-1">Meet {site.agent.name}</h3>
                  <p className="text-muted-foreground font-medium">{site.agent.title}</p>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Getting life insurance shouldn't feel like a high-pressure sales pitch. You deserve clear, honest answers about what options are available to protect your family from the burden of final expenses. My goal is to review your specific situation and help find private coverage options that actually make sense for you.
                </p>
                <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6 space-y-2 text-sm text-navy">
                  <p className="font-semibold text-trustblue mb-3 border-b pb-2">Licensing Information</p>
                  <p><span className="font-medium text-muted-foreground">National Producer Number (NPN):</span> {site.agent.npn}</p>
                  <p><span className="font-medium text-muted-foreground">Licensed in:</span> {site.agent.licensedStates.join(", ")}</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">Services are available only where {site.agent.name} is properly licensed and appointed.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${site.phoneTel}`} onClick={() => track("click_to_call_hero")} className="flex items-center justify-center gap-2 bg-white border-2 border-navy text-navy hover:bg-gray-50 px-6 py-3 rounded-md font-bold transition-colors">
                    <Phone className="h-4 w-4" /> Save {site.agent.name.split(" ")[0]}'s Number
                  </a>
                  <a href={`mailto:${site.email}`} className="flex items-center justify-center gap-2 text-trustblue hover:text-navy font-medium">
                    Email {site.agent.name.split(" ")[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials (clearly-marked placeholders) */}
      <section className="py-16 lg:py-20 bg-softgray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-3">
              What Families Want From This Conversation
            </h2>
            <p className="text-lg text-muted-foreground">Simple answers. Clear options. No pressure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialPlaceholders.map((quote, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                  Placeholder — replace with approved testimonial
                </div>
                <p className="text-muted-foreground italic mt-8 leading-relaxed">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold text-navy text-center mb-10">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-bold text-navy">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-16 lg:py-20 bg-navy text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5 leading-tight">
            Would your family know what to do financially if something happened unexpectedly?
          </h2>
          <p className="text-lg text-white/85 mb-10 leading-relaxed">
            A quick private review can help you understand what options may be available and whether your current coverage is enough.
          </p>
          <div className="flex justify-center">
            <CtaGroup where="final_cta" variant="dark" />
          </div>
        </div>
      </section>

      {/* 11. Contact information */}
      <section className="py-16 lg:py-20 bg-softgray">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-navy mb-1">{site.agent.name}</h2>
            <p className="text-muted-foreground font-medium mb-6">{site.agent.title}</p>
            <div className="flex flex-col items-center gap-3 text-navy mb-6">
              <a href={`tel:${site.phoneTel}`} onClick={() => track("click_to_call_final_cta")} className="flex items-center gap-2 text-xl font-bold text-trustblue hover:text-navy transition-colors">
                <Phone className="h-5 w-5" /> {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 font-medium hover:text-trustblue transition-colors">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
              <a href={site.agent.businessCardUrl} className="flex items-center gap-2 font-medium hover:text-trustblue transition-colors">
                <IdCard className="h-4 w-4" /> Digital business card
              </a>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Licensed in: {site.agent.licensedStates.join(", ")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={`tel:${site.phoneTel}`} onClick={() => track("click_to_call_final_cta")} className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-bold transition-colors">
                <Phone className="h-4 w-4" /> Save {site.agent.name.split(" ")[0]}'s Number
              </a>
              <a href={`sms:${site.phoneSms}`} onClick={() => track("click_to_text")} className="flex items-center justify-center gap-2 bg-white border-2 border-navy text-navy hover:bg-gray-50 px-6 py-3 rounded-md font-bold transition-colors">
                <MessageSquare className="h-4 w-4" /> {cta.textJesse}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Compliance disclosures */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-3 mb-6">
            <ShieldAlert className="h-6 w-6 shrink-0 text-gold" />
            <h2 className="text-xl font-serif font-bold text-navy">Important Disclosures</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>{disclosures.main}</p>
            <p>{disclosures.replacement}</p>
            <p>{disclosures.iul}</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
