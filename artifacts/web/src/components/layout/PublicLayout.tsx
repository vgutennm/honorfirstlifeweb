import { Link } from "wouter";
import { ShieldAlert, Phone, Mail } from "lucide-react";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-softgray">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Honor First Life" className="h-8 w-auto object-contain" />
            <span className="font-serif font-bold text-navy hidden sm:inline-block text-xl">Honor First Life</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-muted-foreground font-medium">Speak With Jesse</span>
              <a href="tel:1-800-555-0199" className="text-sm font-bold text-trustblue hover:text-navy transition-colors">
                (800) 555-0199
              </a>
            </div>
            <Link href="/" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm">
              Check My Options
            </Link>
          </div>
        </div>
        <div className="bg-navy text-white text-center py-1.5 px-4 text-xs font-medium tracking-wide">
          Private life insurance resource. Not affiliated with the VA or government.
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-navy text-white py-12 border-t border-navy/20 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Honor First Life" className="h-8 w-auto object-contain brightness-0 invert" />
                <span className="font-serif font-bold text-xl">Honor First Life</span>
              </Link>
              <p className="text-white/80 text-sm mb-4 max-w-sm">
                Respectful, clear, and private life insurance guidance for veterans and their families.
              </p>
              <div className="flex flex-col gap-2 text-sm text-white/80">
                <a href="tel:1-800-555-0199" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" /> (800) 555-0199
                </a>
                <a href="mailto:jesse@honorfirstlife.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" /> jesse@honorfirstlife.com
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
                Services are available only where Jesse Reiter is properly licensed and appointed.<br/><br/>
                Licensed in: NJ, FL, IN, MS, OH, OR, WA, CA, TN, VA<br/>
                NPN: 123456789
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/20 text-xs text-white/60 space-y-4">
            <div className="flex items-start gap-2 bg-white/5 p-4 rounded-lg">
              <ShieldAlert className="h-5 w-5 shrink-0 text-gold" />
              <p>
                <strong>IMPORTANT DISCLOSURE:</strong> Honor First Life is a private life insurance resource and is NOT affiliated with, endorsed by, or sponsored by the Department of Veterans Affairs (VA), the United States government, or any military branch. We are an independent insurance agency.
              </p>
            </div>
            <p>
              Coverage, pricing, and approval depend on age, health, state of residence, product selected, carrier, and underwriting. Day-one coverage options may be available depending on approval. This site provides private life insurance guidance and is not a promise of a specific rate or guaranteed approval.
            </p>
            <p className="text-center pt-4">
              &copy; {new Date().getFullYear()} Honor First Life. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex gap-2 z-50">
        <a href="tel:1-800-555-0199" className="flex-1 bg-secondary text-secondary-foreground flex items-center justify-center py-3 rounded-md font-bold text-sm">
          Call
        </a>
        <a href="sms:1-800-555-0199" className="flex-1 bg-white border-2 border-navy text-navy flex items-center justify-center py-3 rounded-md font-bold text-sm">
          Text
        </a>
        <Link href="/" className="flex-[2] bg-primary text-primary-foreground flex items-center justify-center py-3 rounded-md font-bold text-sm" onClick={() => window.scrollTo(0, 0)}>
          Options
        </Link>
      </div>
    </div>
  );
}
