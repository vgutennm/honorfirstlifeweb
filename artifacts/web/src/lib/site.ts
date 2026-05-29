// Central, A/B-test-ready configuration for HonorFirstLife.
// Swap these variables to test different headlines, CTA labels, content order,
// trust-badge order, hero copy, and product-section order without touching markup.

export const site = {
  brand: "HonorFirstLife",
  domain: "HonorFirstLife.com",
  phoneDisplay: "(800) 555-0199",
  phoneTel: "1-800-555-0199",
  phoneSms: "1-800-555-0199",
  email: "jesse@honorfirstlife.com",
  agent: {
    name: "Jesse Reiter",
    title: "Licensed Life Insurance Professional",
    npn: "[Placeholder NPN]",
    licensedStates: ["NJ", "FL", "IN", "MS", "OH", "OR", "WA", "CA", "TN", "VA"],
    headshot: "/jesse.png",
    businessCardUrl: "#", // Placeholder digital business card link
  },
};

// Hero copy — primary A/B variables.
export const hero = {
  eyebrow: "Private life insurance guidance",
  headline: "Veteran Life Insurance Made Simple",
  subheadline:
    "Protect your family from funeral costs, final expenses, and leftover bills with clear, respectful guidance from a licensed life insurance professional.",
  callLine:
    "Prefer to talk? Call Jesse directly and ask your questions before filling anything out.",
  trustLine:
    "Private life insurance guidance. Not affiliated with the VA, U.S. government, or any military branch.",
  microTrust:
    "No Social Security number, banking information, or payment information is collected on this website.",
  formHeadline: "See What Options May Fit Your Family",
  formSubheadline:
    "Answer a few quick questions so Jesse knows how to help when he calls.",
};

// CTA labels — swap to test wording. Variants are documented for future A/B tests:
// "Call Jesse Now", "Speak With Jesse", "Check My Options", "Get My Free Review", "Request a Callback".
export const cta = {
  callNow: "Call Jesse Now",
  speakWithJesse: "Speak With Jesse",
  checkOptions: "Check My Options",
  textJesse: "Text Jesse",
};

// Trust strip — order is swappable for A/B tests.
export const trustBadges: string[] = [
  "Licensed Insurance Professional",
  "Private Life Insurance Guidance",
  "Secure Information",
  "Privacy Protected",
  "No-Pressure Review",
  "Veteran-Focused Support",
];

export const benefits: { title: string; body: string }[] = [
  {
    title: "Protect Your Family",
    body: "Help reduce the chance that your spouse, children, or loved ones are left with funeral costs, medical bills, or leftover expenses.",
  },
  {
    title: "Cover Final Expenses",
    body: "Private life insurance may help with burial, cremation, funeral costs, and other final expenses.",
  },
  {
    title: "Review Existing Coverage",
    body: "Already have a policy? Jesse can help review whether it still fits your goals, budget, and family situation.",
  },
  {
    title: "Compare Private Options",
    body: "Jesse can help review options from available private carriers based on your state, age, health, goals, and budget.",
  },
];

// Product explanation section — order is swappable for A/B tests.
export const products: { title: string; body: string; disclosure?: string }[] = [
  {
    title: "Veteran Life Insurance / Final Expense",
    body: "For veterans and families who want help preparing for funeral costs, final bills, and family protection. Family-focused, financially secure, and explained simply with no-pressure guidance.",
  },
  {
    title: "Whole Life Insurance",
    body: "For people who want long-term protection, stable coverage, and a policy designed to last — lifetime coverage, predictable premiums, and legacy protection.",
    disclosure:
      "Whole life insurance may provide lifetime coverage as long as required premiums are paid and the policy remains in force.",
  },
  {
    title: "Indexed Universal Life / IUL",
    body: "For people who want to discuss life insurance with potential cash value growth and long-term planning flexibility. Jesse can help explain whether this type of policy may or may not fit your goals.",
    disclosure:
      "Indexed Universal Life may offer life insurance protection with cash value growth potential, subject to policy terms, caps, participation rates, fees, and other limitations. It is life insurance, not an investment, and results are not guaranteed.",
  },
  {
    title: "Mortgage Protection",
    body: "For homeowners who want to discuss coverage that may help protect their family if something happens unexpectedly. Options depend on age, health, state, carrier, and underwriting.",
  },
  {
    title: "Policy Review / Replacement",
    body: "For people who already have coverage but want to know whether they are overpaying, underinsured, or using the wrong type of policy. No pressure to replace.",
    disclosure:
      "Do not cancel or replace an existing policy until you have reviewed your options and understand the differences, costs, risks, benefits, and approval requirements.",
  },
];

export const howItWorks: { title: string; body: string }[] = [
  {
    title: "Call, text, or submit the form",
    body: "Choose the easiest way to reach Jesse.",
  },
  {
    title: "Jesse reviews your goals",
    body: "He'll ask what you are trying to protect, who you want to protect, and whether you already have coverage.",
  },
  {
    title: "Discuss realistic options",
    body: "Options depend on age, health, state, carrier, product, and underwriting.",
  },
  {
    title: "Apply only if it makes sense",
    body: "Submitting the website form does not create coverage. Coverage only begins if you apply, are approved, and make the required first premium payment.",
  },
];

export const whyChoose: { title: string; body: string }[] = [
  {
    title: "Licensed Guidance",
    body: "Speak with a licensed life insurance professional, not a generic lead vendor.",
  },
  {
    title: "Private Carrier Options",
    body: "Jesse can help compare private life insurance options that may fit your situation.",
  },
  {
    title: "Respectful, No-Pressure Conversation",
    body: "The goal is to help you understand your options, not pressure you into a decision.",
  },
  {
    title: "Veteran-Focused Support",
    body: "The page is designed for veterans and families who want simple, direct answers.",
  },
  {
    title: "Clear Next Steps",
    body: "You'll know what happens after submitting the form or calling.",
  },
  {
    title: "Human Follow-Up",
    body: "Jesse personally reviews your request and follows up by phone or text.",
  },
];

// Clearly-marked testimonial placeholders. Replace with approved testimonials only.
export const testimonialPlaceholders: string[] = [
  "Jesse helped explain the options in a way that was easy to understand.",
  "I wanted to make sure my family would not be left with the bill.",
  "I already had coverage, but wanted someone to help me review it.",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is HonorFirstLife the VA?",
    a: "No. HonorFirstLife is a private life insurance resource and is not affiliated with the VA, U.S. government, or any military branch.",
  },
  {
    q: "Can I call instead of filling out the form?",
    a: "Yes. If you prefer to talk, you can call Jesse directly using the phone button on this page.",
  },
  {
    q: "What kind of life insurance can Jesse help with?",
    a: "Jesse can help review private options for final expense, whole life, term life, mortgage protection, Indexed Universal Life, and existing policy reviews.",
  },
  {
    q: "Is approval guaranteed?",
    a: "No. Approval, coverage amount, premium, and product availability depend on age, health, state, carrier, product, and underwriting.",
  },
  {
    q: "Do I need to enter my Social Security number on this website?",
    a: "No. Do not enter Social Security numbers, banking information, payment information, VA claim numbers, Medicare numbers, or full medical history on this website.",
  },
  {
    q: "What happens after I submit the form?",
    a: "Jesse may call or text you based on your selected contact preference to review your goals and discuss what options may be available.",
  },
  {
    q: "Can Jesse review a policy I already have?",
    a: "Yes. Jesse can help review an existing policy and discuss whether it still fits your goals, budget, and family needs.",
  },
  {
    q: "Is IUL right for everyone?",
    a: "No. Indexed Universal Life is not right for everyone. It may offer protection with cash value growth potential, but it also includes policy terms, fees, caps, participation rates, and other limitations that should be explained before deciding.",
  },
];

// Compliance disclosures shown near the bottom of the page and in the footer.
export const disclosures = {
  main: "HonorFirstLife is a private life insurance resource. Not affiliated with the VA, U.S. government, or any military branch. Product availability, coverage amounts, premiums, and approval depend on age, health, state, product, carrier, and underwriting. Submitting this form does not create coverage or guarantee approval. A licensed insurance professional may contact you to review available options. Services are available only where Jesse Reiter is properly licensed and appointed.",
  replacement:
    "Do not cancel, replace, or modify an existing life insurance policy until you have reviewed the costs, benefits, risks, surrender charges, waiting periods, contestability periods, and approval requirements of any new coverage.",
  iul: "Indexed Universal Life policies are life insurance products, not direct investments. Cash value growth potential depends on policy terms, index crediting methods, caps, participation rates, fees, and other limitations. Results are not guaranteed.",
};
