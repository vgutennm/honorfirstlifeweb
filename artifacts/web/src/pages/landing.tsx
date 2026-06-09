import { useEffect, useRef, useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CarrierLogoStrip } from "@/components/CarrierLogoStrip";
import { useSeo } from "@/lib/seo";
import { useTrack } from "@/hooks/use-track";
import {
  site,
  hero,
  cta,
  trustBadges,
  messageMatch,
  whyCheckNow,
  products,
  faqs,
} from "@/lib/site";
import {
  Shield,
  ShieldCheck,
  Lock,
  FileCheck,
  Building2,
  HandHeart,
  Phone,
  MessageSquare,
  Mail,
  ArrowRight,
  Clock,
  Check,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TRUST_ICONS = [ShieldCheck, FileCheck, Lock, Building2, HandHeart, Shield];

function scrollToForm() {
  document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
}

export default function Landing() {
  useSeo(
    `Compare Veteran Life Insurance Rates in Minutes | ${site.brand}`,
    "Private life insurance guidance for veterans and families. Compare final expense, term, whole life, and no-medical-exam options, or call a licensed agent directly. Not affiliated with the VA or government.",
    { path: "/" },
  );

  const track = useTrack();

  // The quote form is an external CRM embed. When that embed reports its
  // content height via postMessage (see the CRM /embed/form page), we switch
  // from the fixed/cropped fallback to an exact auto-height so the frame never
  // scrolls internally and shows no empty space on either step. Until a height
  // message arrives, the cropped fallback below renders.
  const formIframeRef = useRef<HTMLIFrameElement>(null);
  const [formHeight, setFormHeight] = useState<number | null>(null);

  useEffect(() => {
    const CRM_ORIGIN = "https://contact-manager-lite-vgutenm.replit.app";
    function onMessage(e: MessageEvent) {
      if (e.origin !== CRM_ORIGIN) return;
      const data = e.data as { type?: string; height?: number } | null;
      if (
        data?.type === "hfl-embed-height" &&
        typeof data.height === "number" &&
        data.height > 0
      ) {
        setFormHeight(Math.ceil(data.height));
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Primary above-the-fold CTAs: Get My Quote (primary) + Licensed Agent (secondary).
  const HeroCtas = ({
    where,
    variant = "dark",
  }: {
    where: "hero" | "final_cta";
    variant?: "light" | "dark";
  }) => {
    const quoteEvent =
      where === "hero" ? "click_get_quote_hero" : "click_get_quote_final_cta";
    const callEvent = where === "hero" ? "click_call_hero" : "click_call_final_cta";
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            track(quoteEvent);
            scrollToForm();
          }}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-4 px-7 rounded-md text-lg shadow-md transition-colors"
        >
          {cta.getQuote} <ArrowRight className="h-5 w-5" />
        </button>
        <a
          href={`tel:${site.phoneTel}`}
          onClick={() => track(callEvent)}
          className={`flex items-center justify-center gap-2 font-bold py-4 px-7 rounded-md text-lg transition-colors border-2 ${
            variant === "dark"
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-navy text-navy hover:bg-navy/5 bg-white"
          }`}
        >
          <Phone className="h-5 w-5" /> {cta.callNow}
        </a>
      </div>
    );
  };

  return (
    <PublicLayout>
      {/* 1. Hero — one clear offer, trust stack, and the quote form */}
      <section className="relative overflow-hidden bg-navy text-white pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="absolute inset-0 z-0">
          <img src="/hero-veteran-mobile.png" alt="" aria-hidden="true" className="w-full h-full object-cover object-center sm:hidden" />
          <img src="/hero-veteran.png" alt="" aria-hidden="true" className="hidden sm:block w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/35 sm:bg-gradient-to-r sm:from-navy/95 sm:via-navy/45 sm:to-navy/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-5 [text-shadow:0_2px_14px_rgba(10,30,63,0.9)]">
                {hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed [text-shadow:0_1px_10px_rgba(10,30,63,0.85)]">
                {hero.subheadline}
              </p>

              <HeroCtas where="hero" variant="dark" />

              <a
                href={`tel:${site.phoneTel}`}
                onClick={() => track("click_call_hero")}
                className="inline-flex items-center gap-2 mt-5 text-white font-semibold hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4 text-gold" />
                {hero.phoneLinePrefix} <span className="underline">{site.phoneDisplay}</span>
              </a>

              <p className="text-xs text-white/60 mt-3">{hero.microTrust}</p>

              {/* Trust stack — above the form on mobile, beside it on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-8 max-w-lg">
                {trustBadges.map((badge, i) => {
                  const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
                  return (
                    <span key={badge} className="flex items-center gap-2 text-sm text-white/90">
                      <Icon className="h-4 w-4 text-gold shrink-0" /> {badge}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Hero form — external CRM embed.
               Preferred path: the embed posts its content height (type
               "hfl-embed-height") and we set an exact auto-height (formHeight),
               so the frame never scrolls internally and shows no empty space.
               Fallback (no message yet): the embed renders its card on a
               slate-50 body with padding, so we crop the slate (overflow-hidden
               + negative insets), mask the exposed corners, and use a tuned
               per-breakpoint height. */}
            <div id="form-section" className="scroll-mt-20">
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-navy">
                <iframe
                  ref={formIframeRef}
                  src="https://contact-manager-lite-vgutenm.replit.app/embed/form"
                  title="Request your quote"
                  className={
                    formHeight
                      ? "block border-none bg-navy w-full"
                      : "block border-none bg-navy -mt-6 -ml-4 w-[calc(100%+2rem)] h-[700px] sm:h-[608px] lg:h-[624px] xl:h-[604px]"
                  }
                  style={
                    formHeight
                      ? { border: "none", height: `${formHeight}px` }
                      : { border: "none" }
                  }
                />
                {/* Fallback only: while the embed isn't reporting its height we
                   crop the slate band, which exposes the card's rounded-corner
                   gaps — mask them with navy. Once auto-height is active the
                   embed renders flush and these masks are hidden. */}
                {!formHeight && (
                  <>
                    <div aria-hidden className="pointer-events-none absolute top-0 left-0 h-7 w-6 bg-navy" />
                    <div aria-hidden className="pointer-events-none absolute top-0 right-0 h-7 w-6 bg-navy" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Carrier options logo strip */}
      <CarrierLogoStrip />

      {/* 3. Message match — mirrors likely PPC ad language */}
      <section className="bg-white py-12 lg:py-14 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {messageMatch.map((m) => (
              <div key={m.title} className="bg-softgray rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why check now — urgency without hype */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-6 flex items-center gap-3">
            <Clock className="h-6 w-6 text-gold shrink-0" /> {whyCheckNow.title}
          </h2>
          <ul className="space-y-3">
            {whyCheckNow.reasons.map((r) => (
              <li key={r} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                <Check className="h-5 w-5 text-trustblue shrink-0 mt-0.5" /> {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Product options — compact cards */}
      <section className="py-14 lg:py-16 bg-softgray">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy text-center mb-10">
            Options Honor First Life Can Help You Review
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="h-10 w-10 bg-blue-50 text-trustblue rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-navy mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ — short and conversion-focused */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy text-center mb-10">
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

      {/* 8. Final CTA */}
      <section className="py-14 lg:py-16 bg-navy text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight">
            Ready to see what may fit your family?
          </h2>
          <p className="text-lg text-white/85 mb-8 leading-relaxed">
            Request a quote or call a licensed agent directly. No obligation, and no payment information is collected on this website.
          </p>
          <div className="flex justify-center">
            <HeroCtas where="final_cta" variant="dark" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-sm text-white/80">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
            <a href={`sms:${site.phoneSms}`} onClick={() => track("click_to_text")} className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageSquare className="h-4 w-4" /> {cta.textAgent}
            </a>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}
