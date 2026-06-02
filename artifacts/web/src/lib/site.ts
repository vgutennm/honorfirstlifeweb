// Central, A/B-test-ready configuration for HonorFirstLife.
// Swap these variables to test different headlines, CTA labels, content order,
// trust-badge order, hero copy, and product-section order without touching markup.
//
// This page is intentionally structured as a PPC conversion funnel for cold
// paid traffic: one clear offer, minimal navigation, fast path to a quote
// request or a call. Educational / brand-heavy content stays compact and below
// the first conversion section.

export const site = {
  brand: "HonorFirstLife",
  domain: "HonorFirstLife.com",
  phoneDisplay: "(551) 265-8328",
  phoneTel: "1-551-265-8328",
  phoneSms: "1-551-265-8328",
  email: "insuredbyjessereiter@gmail.com",
  agent: {
    name: "Licensed Agent",
    title: "Licensed Life Insurance Professional",
    licensedScope: "all 50 states",
    licensedStates: ["NJ", "FL", "IN", "MS", "OH", "OR", "WA", "CA", "TN", "VA"],
    headshot: "/jesse.jpg",
    businessCardUrl: "#", // Placeholder digital business card link
  },
};

// Hero copy — primary A/B variables.
export const hero = {
  headline: "Compare Veteran Life Insurance Rates in Minutes",
  subheadline:
    "Final expense, term life, whole life, and no-medical-exam options may be available depending on your age, health, state, carrier, and underwriting.",
  trustLine:
    "Not affiliated with the VA, U.S. government, or any military branch.",
  phoneLinePrefix: "Talk to a licensed agent now:",
  microTrust: "No obligation. No payment information collected on this website. We do not sell your information to third parties.",
};

// CTA labels — swap to test wording.
export const cta = {
  getQuote: "Get My Quote",
  callNow: "Licensed Agent",
  textAgent: "Text a Licensed Agent",
};

// Trust stack shown above/beside the form, above the fold.
export const trustBadges: string[] = [
  "Licensed Insurance Professional",
  "No Obligation Quote",
  "Secure Information Request",
  "Private Carrier Options",
  "Veteran-Focused Guidance",
  "No VA or Government Affiliation",
];

// Short message-match blocks that mirror likely PPC ad language.
export const messageMatch: { title: string; body: string }[] = [
  {
    title: "Veteran Life Insurance Quotes",
    body: "Private life insurance options for veterans and families who want clear guidance and a simple next step.",
  },
  {
    title: "Final Expense Coverage",
    body: "Options may help with funeral, cremation, burial, medical bills, or other final expenses.",
  },
  {
    title: "No Medical Exam Options",
    body: "Some products may not require a traditional medical exam. Approval still depends on age, health, state, carrier, product, and underwriting.",
  },
  {
    title: "Compare Private Carrier Options",
    body: "A licensed agent can help review options from available private carriers instead of forcing you into one company's product.",
  },
];

// Reasons to act now — no hype or false scarcity.
export const whyCheckNow = {
  title: "Why check now?",
  reasons: [
    "Life insurance rates generally increase with age.",
    "Health changes can affect what options may be available.",
    "Carrier options, pricing, and approval rules can change.",
    "A quick review can help you understand what may fit before waiting longer.",
  ],
};

// Compact product cards — kept brief and below the first form.
export const products: { title: string; body: string }[] = [
  {
    title: "Final Expense",
    body: "Help prepare for funeral, cremation, burial, and final bills.",
  },
  {
    title: "Term Life",
    body: "Temporary coverage options for family, income, or mortgage protection needs.",
  },
  {
    title: "Whole Life",
    body: "Permanent life insurance designed to stay in force as long as required premiums are paid and the policy remains active.",
  },
  {
    title: "Indexed Universal Life",
    body: "Life insurance with cash value growth potential, subject to policy terms, fees, caps, participation rates, and other limitations.",
  },
  {
    title: "Policy Review",
    body: "Already have coverage? A licensed agent can help review whether it still fits your goals.",
  },
];

export const productsDisclaimer =
  "Product availability, features, costs, and approval depend on the carrier, state, product, age, health, and underwriting.";

// Carrier logo strip. Shows the combined carrier image for now; individual logo
// tiles can be swapped in later by populating `logos` with files in /public/carriers/.
export const carriers = {
  heading: "Carrier Options a Licensed Agent Can Help You Review",
  subheading:
    "A licensed agent can help compare private life insurance options from multiple carriers. Product availability, pricing, and approval depend on age, health, state, carrier, product, and underwriting.",
  combinedImage: "/carriers/all-carriers.jpg",
  combinedImageAlt:
    "Life insurance carrier options including Americo, Aetna, AIG, Transamerica, Mutual of Omaha, Foresters Financial, and others",
  compliance:
    "Carrier availability varies by state, product, eligibility, and underwriting. Logos and names are shown only to represent potential private carrier options and do not imply approval, endorsement, or guaranteed coverage.",
  // Future: when individual logo files are confirmed for /public/carriers/, add
  // entries here ({ name, src }) and the strip renders clean logo tiles instead
  // of the combined image.
  logos: [] as { name: string; src: string }[],
  // Reference list of potential carriers for future individual-tile rendering.
  names: [
    "Americo", "Aetna", "AIG", "Global Atlantic Financial Group",
    "National Life Group", "Gerber Life", "Transamerica", "F&G",
    "Oxford Life Insurance Company", "Royal Neighbors of America",
    "Athene Annuity", "Foresters Financial", "Mutual of Omaha",
    "John Hancock", "Vitality", "Columbian Financial Group",
    "Prosperity Life Group", "North American",
    "American-Amicable Group of Companies", "ReliaShield",
    "Guardian Wealth Strategies",
  ],
};

// Compact credibility block for the agent.
export const credibility = {
  title: "Speak With a Licensed Agent",
  body: "A licensed life insurance professional helps veterans and families review private life insurance options. The goal is simple: clear answers, realistic options, and no-pressure guidance.",
};

// Clearly-marked testimonial placeholder. No fake names, reviews, or ratings.
export const testimonials = {
  title: "Real Client Feedback Coming Soon",
  body: "A licensed agent may add approved client feedback here once available. For now, you can call directly and ask your questions before deciding whether to move forward.",
};

// Short, conversion-focused FAQ.
export const faqs: { q: string; a: string }[] = [
  {
    q: "Is HonorFirstLife part of the VA?",
    a: "No. HonorFirstLife is a private life insurance resource and is not affiliated with the VA, U.S. government, or any military branch.",
  },
  {
    q: "Can I call instead of filling out the form?",
    a: "Yes. Use the Licensed Agent button to speak directly with a licensed agent.",
  },
  {
    q: "Can veterans get life insurance without a medical exam?",
    a: "Some private products may not require a traditional medical exam. Approval, pricing, and coverage depend on age, health, state, product, carrier, and underwriting.",
  },
  {
    q: "Is approval guaranteed?",
    a: "No. Coverage is not guaranteed.",
  },
  {
    q: "What happens after I submit the form?",
    a: "A licensed agent may call or text you to review your request and discuss what options may be available.",
  },
  {
    q: "Do I need to enter my Social Security number here?",
    a: "No. Do not enter Social Security numbers, banking information, payment information, VA claim numbers, Medicare numbers, or full medical history on this website.",
  },
];

// Compliance disclosures shown near the bottom of the page and in the footer.
export const disclosures = {
  main: "HonorFirstLife is a private life insurance resource. Not affiliated with the VA, U.S. government, or any military branch. Product availability, coverage amounts, premiums, and approval depend on age, health, state, product, carrier, and underwriting. Submitting this form does not create coverage or guarantee approval. A licensed insurance professional may contact you to review available options. Services are available only where the agent is properly licensed and appointed.",
  iul: "Indexed Universal Life policies are life insurance products, not direct investments. Cash value growth potential depends on policy terms, index crediting methods, caps, participation rates, fees, and other limitations. Results are not guaranteed.",
  replacement:
    "Do not cancel, replace, or modify an existing life insurance policy until you understand the costs, benefits, risks, surrender charges, waiting periods, contestability periods, and approval requirements of any new coverage.",
};
