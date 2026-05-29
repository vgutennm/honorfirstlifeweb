import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSeo } from "@/lib/seo";
import { CheckCircle2, Phone, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { trackEventObj } from "@/lib/analytics";
import { useTrackEvent } from "@workspace/api-client-react";

const JESSE_PHONE = "(800) 555-0199";

export default function ThankYou() {
  useSeo("Thank You | Honor First Life", "Your request has been received.");
  
  const trackEventApi = useTrackEvent();

  useEffect(() => {
    // Fire analytics on mount
    trackEventObj("thank_you_view");
    trackEventApi.mutate({ data: { eventType: "thank_you_view" } });
  }, []);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="bg-green-50 text-green-700 p-4 rounded-full mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold text-navy mb-4">Your request was received.</h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for reaching out. Jesse will review your information and follow up with you based on your contact preferences.
        </p>

        <div className="bg-softgray border-2 border-gold rounded-xl p-8 max-w-md w-full mb-8 shadow-sm">
          <p className="font-bold text-navy mb-2 text-lg">Save this number so you recognize Jesse's call:</p>
          <p className="text-3xl font-serif font-bold text-trustblue mb-4">{JESSE_PHONE}</p>
          <div className="flex flex-col gap-3">
            <a href="tel:1-800-555-0199" className="w-full bg-trustblue text-white hover:bg-trustblue/90 px-6 py-3 rounded-md font-bold transition-colors flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" /> Call Jesse Now
            </a>
            <a href="sms:1-800-555-0199" className="w-full bg-white border-2 border-navy text-navy hover:bg-gray-50 px-6 py-3 rounded-md font-bold transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" /> Text Jesse
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
          Reminder: Honor First Life is a private life insurance resource and is not affiliated with the VA or any government agency.
        </p>

        <Link href="/" className="inline-flex items-center gap-2 text-navy font-medium hover:underline">
          <ArrowLeft className="h-4 w-4" /> Return Home
        </Link>
      </div>
    </PublicLayout>
  );
}
