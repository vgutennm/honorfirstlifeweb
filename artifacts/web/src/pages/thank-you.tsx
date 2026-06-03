import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSeo } from "@/lib/seo";
import { CheckCircle2, Phone, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { useTrack } from "@/hooks/use-track";
import { site, cta } from "@/lib/site";

export default function ThankYou() {
  useSeo(`Thank You | ${site.brand}`, "Your request has been received.", {
    path: "/thank-you",
    noindex: true,
  });

  const track = useTrack();

  useEffect(() => {
    track("thank_you_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="bg-green-50 text-green-700 p-4 rounded-full mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <h1 className="text-4xl font-serif font-bold text-navy mb-4">Your request was received.</h1>

        <p className="text-xl text-muted-foreground mb-8">
          Thank you. A licensed agent received your request and may call or text you soon to review what options may be available.
        </p>

        <div className="bg-softgray border-2 border-gold rounded-xl p-8 max-w-md w-full mb-8 shadow-sm">
          <p className="font-bold text-navy mb-2 text-lg">Please save our number so you recognize the call:</p>
          <a
            href={`tel:${site.phoneTel}`}
            onClick={() => track("click_call_thank_you")}
            className="block text-3xl font-serif font-bold text-trustblue mb-4 hover:underline"
          >
            {site.phoneDisplay}
          </a>
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${site.phoneTel}`}
              onClick={() => track("click_call_thank_you")}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" /> {cta.callNow}
            </a>
            <a
              href={`sms:${site.phoneSms}`}
              onClick={() => track("click_to_text")}
              className="w-full bg-white border-2 border-navy text-navy hover:bg-gray-50 px-6 py-3 rounded-md font-bold transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" /> {cta.textAgent}
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
          {site.brand} is a private life insurance resource and is not affiliated with the VA, U.S. government, or any military branch.
        </p>

        <Link href="/" className="inline-flex items-center gap-2 text-navy font-medium hover:underline">
          <ArrowLeft className="h-4 w-4" /> Return Home
        </Link>
      </div>
    </PublicLayout>
  );
}
