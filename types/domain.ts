export type Goal = "return" | "pivot" | "first-role";

export interface ReStartProfile {
  name: string;
  targetRole: string;
  story: string;
  weeklyHours: number;
  goal: Goal;
  proofPoints: string[];
}

export interface PlanStep {
  id: string;
  title: string;
  detail: string;
  minutes: number;
  deliverable: string;
}

export interface OpportunityMatch {
  id: string;
  title: string;
  organization: string;
  reason: string;
  fit: number;
  remote: boolean;
}

export interface ReStartPlan {
  positioning: string;
  strengthSignals: string[];
  steps: PlanStep[];
  opportunities: OpportunityMatch[];
  totalMinutes: number;
}
