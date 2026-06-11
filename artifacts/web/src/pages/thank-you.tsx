import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import { useTrack } from "@/hooks/use-track";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { Link } from "wouter";

// Dedicated Thank You / conversion confirmation page.
// Reachable directly at /thank-you (the embedded form app redirects here after a
// successful submission). It requires no form data, is not JS-gated, and is kept
// lightweight so the global GTM container can fire its conversion tags on load.
export default function ThankYou() {
  const track = useTrack();

  useSeo(
    "Thank You | HonorFirstLife",
    "Your request has been received. A licensed insurance agent may contact you shortly.",
    { path: "/thank-you", noindex: true },
  );

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16 sm:py-24 max-w-2xl">
        <div className="bg-white border-2 border-gold rounded-xl p-8 sm:p-12 shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gold/10 p-4 rounded-full">
              <CheckCircle2 className="h-10 w-10 text-gold" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy mb-4">
            Thank You
          </h1>

          <p className="text-lg text-slate-700 leading-relaxed mb-3">
            Your request has been received. A licensed insurance agent may contact you shortly.
          </p>

          <p className="text-slate-700 leading-relaxed mb-2">
            Want to move faster? Text now to set an appointment with a licensed agent.
          </p>

          <p className="text-slate-500 mb-8">
            You can close this page or return to the home page.
          </p>

          <div className="flex flex-col items-center gap-3">
            <a
              href={`sms:${site.phoneSms}?&body=${encodeURIComponent(
                "Hi, I just submitted my info on HonorFirstLife and would like to set an appointment.",
              )}`}
              onClick={() => track("click_text_appointment_thankyou")}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-bold transition-colors"
            >
              <MessageSquare className="h-5 w-5" /> Text Now to Set an Appointment
            </a>

            <Link
              href="/"
              className="inline-block text-trustblue hover:text-navy font-semibold px-4 py-2 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
