import { Link } from "wouter";
import { ShieldAlert, Phone, Mail, MessageSquare } from "lucide-react";
import { site, cta, disclosures } from "@/lib/site";
import { useTrack } from "@/hooks/use-track";

function scrollToForm() {
  const el = document.getElementById("form-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "/#form-section";
  }
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const track = useTrack();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-softgray">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt={site.brand} className="h-8 w-auto object-contain" />
            <span className="font-serif font-bold text-navy hidden sm:inline-block text-xl">{site.brand}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile click-to-call icon */}
            <a
              href={`tel:${site.phoneTel}`}
              onClick={() => track("click_to_call_header")}
              aria-label={`Call ${site.agent.name}`}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-secondary-foreground"
            >
              <Phone className="h-5 w-5" />
            </a>

            {/* Desktop phone CTA (prominent — calls are the primary objective) */}
            <a
              href={`tel:${site.phoneTel}`}
              onClick={() => track("click_to_call_header")}
              className="hidden md:inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md font-bold text-sm transition-colors shadow-sm"
            >
              <Phone className="h-4 w-4" />
              <span className="flex flex-col leading-tight items-start">
                <span className="text-[10px] font-medium uppercase tracking-wide opacity-90">{cta.speakWithJesse}</span>
                <span>{site.phoneDisplay}</span>
              </span>
            </a>

            <button
              onClick={scrollToForm}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm"
            >
              {cta.checkOptions}
            </button>
          </div>
        </div>
        <div className="bg-navy text-white text-center py-1.5 px-4 text-xs font-medium tracking-wide">
          Private life insurance resource. Not affiliated with the VA or government.
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      <footer className="bg-navy text-white py-12 border-t border-navy/20 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt={site.brand} className="h-8 w-auto object-contain brightness-0 invert" />
                <span className="font-serif font-bold text-xl">{site.brand}</span>
              </Link>
              <p className="text-white/80 text-sm mb-4 max-w-sm">
                Respectful, clear, and private life insurance guidance for veterans and their families.
              </p>
              <div className="flex flex-col gap-2 text-sm text-white/80">
                <a href={`tel:${site.phoneTel}`} onClick={() => track("click_to_call_header")} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" /> {site.phoneDisplay}
                </a>
                <a href={`sms:${site.phoneSms}`} onClick={() => track("click_to_text")} className="flex items-center gap-2 hover:text-white transition-colors">
                  <MessageSquare className="h-4 w-4" /> Text {site.agent.name.split(" ")[0]}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 font-serif">Resources</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/not-affiliated-with-va" className="hover:text-white transition-colors">Not Affiliated with the VA</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 font-serif">Licensing</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Services are available only where {site.agent.name} is properly licensed and appointed.<br /><br />
                Licensed in: {site.agent.licensedStates.join(", ")}<br />
                NPN: {site.agent.npn}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 text-xs text-white/60 space-y-4">
            <div className="flex items-start gap-2 bg-white/5 p-4 rounded-lg">
              <ShieldAlert className="h-5 w-5 shrink-0 text-gold" />
              <p>
                <strong>IMPORTANT DISCLOSURE:</strong> {disclosures.main}
              </p>
            </div>
            <p>{disclosures.replacement}</p>
            <p>{disclosures.iul}</p>
            <p className="text-center pt-4">
              &copy; {new Date().getFullYear()} {site.brand}. All rights reserved. Website by{" "}
              <a
                href="http://SetUpShopOnline.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gold"
              >
                SetUpShopOnline
              </a>
              .
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA bar — Call / Text / Check Options */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex gap-2 z-50">
        <a
          href={`tel:${site.phoneTel}`}
          onClick={() => track("click_to_call_sticky_mobile")}
          className="flex-1 bg-secondary text-secondary-foreground flex items-center justify-center gap-1.5 py-3 rounded-md font-bold text-sm"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={`sms:${site.phoneSms}`}
          onClick={() => track("click_to_text")}
          className="flex-1 bg-white border-2 border-navy text-navy flex items-center justify-center gap-1.5 py-3 rounded-md font-bold text-sm"
        >
          <MessageSquare className="h-4 w-4" /> Text
        </a>
        <button
          onClick={scrollToForm}
          className="flex-[1.4] bg-primary text-primary-foreground flex items-center justify-center py-3 rounded-md font-bold text-sm"
        >
          {cta.checkOptions}
        </button>
      </div>
    </div>
  );
}
