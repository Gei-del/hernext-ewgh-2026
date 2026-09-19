import { OpportunityMatch, ReStartPlan, ReStartProfile } from "@/types/domain";

const opportunities: OpportunityMatch[] = [
  {
    id: "women-build-ai",
    title: "Women Build AI Fellowship",
    organization: "Open Futures Lab",
    reason: "Remote, project-led, and open to nontraditional experience.",
    fit: 94,
    remote: true,
  },
  {
    id: "civic-data",
    title: "Civic Data Prototype Grant",
    organization: "Common Ground Fund",
    reason: "Values public-interest projects and practical data skills.",
    fit: 88,
    remote: true,
  },
  {
    id: "returnship",
    title: "Technology Returnship",
    organization: "Northstar Systems",
    reason: "Designed for professionals returning after a career pause.",
    fit: 84,
    remote: false,
  },
];

function sentence(value: string) {
  const trimmed = value.trim().replace(/[.!?]+$/, "");
  return trimmed ? `${trimmed}.` : "";
}

export function buildReStartPlan(profile: ReStartProfile): ReStartPlan {
  const firstProof = profile.proofPoints[0] || "a project you completed";
  const secondProof = profile.proofPoints[1] || "a challenge you solved";
  const weeklyMinutes = profile.weeklyHours * 60;
  const steps = [
    {
      id: "story",
      title: "Name the through-line",
      detail: `Connect ${firstProof.toLowerCase()} to the value required in ${profile.targetRole}.`,
      minutes: Math.min(45, Math.round(weeklyMinutes * 0.2)),
      deliverable: "Three-sentence professional story",
    },
    {
      id: "proof",
      title: "Package one proof point",
      detail: `Turn ${secondProof.toLowerCase()} into a result-focused portfolio note.`,
      minutes: Math.min(90, Math.round(weeklyMinutes * 0.4)),
      deliverable: "One shareable evidence card",
    },
    {
      id: "apply",
      title: "Make one focused application",
      detail: "Choose the strongest match, tailor the opening paragraph, and review every claim before sending.",
      minutes: Math.min(75, Math.round(weeklyMinutes * 0.3)),
      deliverable: "One reviewed application draft",
    },
  ];

  const context = profile.goal === "return"
    ? "returning to professional growth"
    : profile.goal === "pivot"
      ? "moving into a new field"
      : "entering a first formal role";

  return {
    positioning: `${profile.name || "This candidate"} is ${context} toward ${profile.targetRole}. ${sentence(profile.story)} The strongest evidence is practical work, not a perfect timeline.`,
    strengthSignals: profile.proofPoints.slice(0, 3),
    steps,
    opportunities: opportunities.map((item, index) => ({
      ...item,
      fit: Math.max(72, item.fit - index * Math.max(0, 6 - profile.weeklyHours)),
    })),
    totalMinutes: steps.reduce((total, step) => total + step.minutes, 0),
  };
}
