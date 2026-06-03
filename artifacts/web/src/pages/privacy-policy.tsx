import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSeo } from "@/lib/seo";
import { site } from "@/lib/site";

export default function PrivacyPolicy() {
  useSeo(
    "Privacy Policy | HonorFirstLife",
    "How HonorFirstLife collects, uses, and protects your information. We never collect Social Security numbers, banking, or payment information on this website.",
    { path: "/privacy-policy" },
  );

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold text-navy mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>The quote request form on this website is provided and operated by a third-party customer relationship management (CRM) provider on our behalf. When you submit that form, the information you provide&mdash;such as your name, phone number, email address, state, zip code, and details about your insurance interests and basic health status&mdash;is collected and stored by that provider so a licensed insurance professional can follow up with you.</p>
          <p><strong>This website itself does not collect or store any form submissions.</strong> Neither this website nor the embedded form collects: Social Security numbers, bank account information, credit card numbers, Medicare numbers, VA claim numbers, or detailed medical histories.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Contact you regarding your request for life insurance information.</li>
            <li>Connect you with a licensed insurance professional.</li>
            <li>Determine basic eligibility for various private life insurance products.</li>
            <li>Improve our website and services.</li>
          </ul>

          <h2>3. SMS & Communication Consent</h2>
          <p>By providing your phone number and submitting the form, you consent to receive calls and text messages from HonorFirstLife regarding your inquiry. Message and data rates may apply. You can opt out of text messages at any time by replying STOP.</p>

          <h2>4. Information Sharing</h2>
          <p>We do not sell your personal information to third-party lead aggregators or marketing lists. Your information is shared only with our licensed insurance professional and the necessary service providers&mdash;including the third-party CRM that powers the quote request form&mdash;who assist in our operations.</p>

          <h2>5. Not Affiliated with the VA</h2>
          <p>HonorFirstLife is a private commercial website. We are not affiliated with, endorsed by, or sponsored by the Department of Veterans Affairs (VA), the U.S. government, or any military branch.</p>

          <h2>6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>Email: {site.email}<br/>Phone: {site.phoneDisplay}</p>
        </div>
      </div>
    </PublicLayout>
  );
}
