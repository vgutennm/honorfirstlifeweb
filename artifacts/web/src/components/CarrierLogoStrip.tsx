import { carriers } from "@/lib/site";

export function CarrierLogoStrip() {
  const hasIndividualLogos = carriers.logos.length > 0;

  return (
    <section className="py-14 lg:py-16 bg-softgray">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-3">
            {carriers.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {carriers.subheading}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 max-w-[900px] mx-auto">
          {hasIndividualLogos ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 items-center">
              {carriers.logos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center justify-center h-14"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={carriers.combinedImage}
              alt={carriers.combinedImageAlt}
              loading="lazy"
              className="block w-full h-auto object-contain"
            />
          )}
        </div>
      </div>
    </section>
  );
}
