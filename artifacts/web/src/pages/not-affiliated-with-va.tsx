import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSeo } from "@/lib/seo";
import { ShieldAlert } from "lucide-react";
import { Link } from "wouter";

export default function NotAffiliated() {
  useSeo(
    "Not Affiliated With the VA | HonorFirstLife",
    "HonorFirstLife is a private, independent life insurance resource. We are not affiliated with, endorsed by, or sponsored by the VA, the U.S. government, or any military branch.",
    { path: "/not-affiliated-with-va" },
  );

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white border-2 border-gold rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gold/10 p-3 rounded-full">
              <ShieldAlert className="h-8 w-8 text-gold" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-navy">Important Disclosure</h1>
          </div>
          
          <div className="prose prose-slate max-w-none text-lg leading-relaxed">
            <p className="font-bold text-navy">
              HonorFirstLife is a private life insurance resource. We are NOT affiliated with, endorsed by, or sponsored by the Department of Veterans Affairs (VA), the United States government, or any military branch.
            </p>
            
            <p>
              We are an independent, private insurance agency operated by Jesse Reiter, a licensed life insurance professional.
            </p>

            <p>
              When you speak with us, you are speaking with a private agent who can help you explore private commercial life insurance options (such as final expense, whole life, and term life insurance) from various independent insurance carriers.
            </p>

            <p>
              We do not offer, administer, or manage any government or VA benefits. Any life insurance products discussed or purchased through our guidance are private commercial products, not government programs.
            </p>

            <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center gap-4">
              <Link href="/" className="w-full sm:w-auto text-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-bold transition-colors">
                Return to Home
              </Link>
              <a href="https://www.va.gov/life-insurance/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center bg-gray-100 text-gray-800 hover:bg-gray-200 px-8 py-3 rounded-md font-medium transition-colors">
                Visit Official VA Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
