import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSeo } from "@/lib/seo";

export default function Terms() {
  useSeo(
    "Terms of Service | HonorFirstLife",
    "Terms of Service for HonorFirstLife, a private life insurance resource not affiliated with the VA or government.",
    { path: "/terms" },
  );

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold text-navy mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the HonorFirstLife website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>

          <h2>2. Nature of Service</h2>
          <p>HonorFirstLife provides information and connects users with a licensed life insurance professional. We are not an insurance carrier. Any insurance coverage is subject to the terms and conditions of the specific policy issued by the applicable insurance company.</p>

          <h2>3. Disclaimers</h2>
          <p><strong>Not Affiliated with the VA:</strong> HonorFirstLife is a private business. We are not affiliated with, endorsed by, or sponsored by the Department of Veterans Affairs (VA), the United States government, or any military branch.</p>
          <p><strong>No Guarantee of Coverage:</strong> Coverage, pricing, and approval depend on numerous factors including your age, health, state of residence, product selected, carrier, and underwriting requirements. We do not guarantee approval or specific rates.</p>

          <h2>4. User Conduct</h2>
          <p>You agree to provide accurate and truthful information when using our services. You agree not to use the website for any unlawful purpose or in any way that could damage, disable, or impair the site.</p>

          <h2>5. Intellectual Property</h2>
          <p>The content, design, and branding of HonorFirstLife are owned by us and are protected by intellectual property laws. You may not use our brand, logo, or content without our express written permission.</p>

          <h2>6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, HonorFirstLife and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the website or our services.</p>

          <h2>7. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at Honorfirstlife@gmail.com.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
