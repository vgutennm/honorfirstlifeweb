import type { InsertLead } from "@workspace/db";

const LICENSED_STATES = [
  "NJ",
  "FL",
  "IN",
  "MS",
  "OH",
  "OR",
  "WA",
  "CA",
  "TN",
  "VA",
];

/**
 * Computes a hidden internal lead score used only for prioritization.
 * Leads are never rejected based on health, age, income, veteran status, or
 * other protected/sensitive factors — score is for sorting in the dashboard.
 */
export function computeLeadScore(lead: Partial<InsertLead>): number {
  let score = 0;

  const state = (lead.state ?? "").trim().toUpperCase();
  if (LICENSED_STATES.includes(state)) {
    score += 30;
  } else {
    score -= 10;
  }

  const veteran = (lead.veteranStatus ?? "").toLowerCase();
  if (veteran.includes("yes") || veteran.includes("spouse") || veteran.includes("family")) {
    score += 15;
  }

  const age = lead.ageRange ?? "";
  if (/50|60|70|80/.test(age)) {
    score += 15;
  } else if (/under 40/i.test(age)) {
    score -= 5;
  }

  const goal = (lead.primaryGoal ?? lead.reasonForInterest ?? "").toLowerCase();
  if (goal.includes("final") || goal.includes("funeral") || goal.includes("family") || goal.includes("leave money")) {
    score += 10;
  }

  if ((lead.phone ?? "").replace(/\D/g, "").length >= 10) {
    score += 10;
  } else {
    score -= 15;
  }

  const time = (lead.bestContactTime ?? "").toLowerCase();
  if (time.includes("asap") || time.includes("today")) {
    score += 15;
  }

  const review = (lead.wantsPolicyReview ?? "").toLowerCase();
  if (review === "yes") {
    score += 5;
  }

  const pref = (lead.contactPreference ?? "").toLowerCase();
  const comfort = (lead.comfortWithCall ?? "").toLowerCase();
  if (pref.includes("call") || pref.includes("either") || comfort.includes("call")) {
    score += 10;
  } else if (pref.includes("text") && !pref.includes("either")) {
    score += 2;
  }

  const product = (lead.productInterest ?? "").toLowerCase();
  if (/under 40/i.test(age) && product.includes("iul")) {
    score -= 10;
  }

  if (!goal && !product) {
    score -= 5;
  }

  return Math.max(0, Math.min(100, score));
}

export function isHotLead(score: number, lead: Partial<InsertLead>): boolean {
  const time = (lead.bestContactTime ?? "").toLowerCase();
  return score >= 60 || time.includes("asap");
}

export function isLicensedState(state: string): boolean {
  return LICENSED_STATES.includes(state.trim().toUpperCase());
}
