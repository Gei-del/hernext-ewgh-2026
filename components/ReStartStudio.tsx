"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { buildReStartPlan } from "@/lib/planner";
import { Goal, ReStartPlan, ReStartProfile } from "@/types/domain";

const proofOptions = [
  "Built a working digital project",
  "Solved a problem for my community",
  "Learned a technical skill independently",
  "Coordinated care, study, and deadlines",
  "Presented or documented my work",
];

const initialProfile: ReStartProfile = {
  name: "",
  targetRole: "",
  story: "",
  weeklyHours: 6,
  goal: "return",
  proofPoints: [],
};

const demoProfile: ReStartProfile = {
  name: "Lina",
  targetRole: "Junior software developer",
  story: "I kept building software projects while studying and caring for my family",
  weeklyHours: 6,
  goal: "return",
  proofPoints: [
    "Built a working digital project",
    "Learned a technical skill independently",
    "Coordinated care, study, and deadlines",
  ],
};

function Icon({ name }: { name: "arrow" | "check" | "copy" | "route" | "spark" | "time" | "user" }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h2a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4"/></>,
    spark: <path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/>,
    time: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-5 3.3-7 8-7s7.3 2 8 7"/></>,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function minutesLabel(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

export function ReStartStudio() {
  const [profile, setProfile] = useState<ReStartProfile>(initialProfile);
  const [plan, setPlan] = useState<ReStartPlan | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [notice, setNotice] = useState("Ready when you are.");
  const resultRef = useRef<HTMLElement>(null);

  const completion = useMemo(() => plan ? Math.round((completed.length / plan.steps.length) * 100) : 0, [completed, plan]);

  const update = <K extends keyof ReStartProfile>(key: K, value: ReStartProfile[K]) => {
    setProfile((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const toggleProof = (proof: string) => {
    const next = profile.proofPoints.includes(proof)
      ? profile.proofPoints.filter((item) => item !== proof)
      : [...profile.proofPoints, proof];
    update("proofPoints", next);
  };

  const loadDemo = () => {
    setProfile(demoProfile);
    setErrors({});
    setPlan(null);
    setCompleted([]);
    setSelectedMatch(null);
    setNotice("Demo story loaded. Every field remains editable.");
  };

  const generatePlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!profile.name.trim()) nextErrors.name = "Add the name you want the plan to use.";
    if (profile.targetRole.trim().length < 3) nextErrors.targetRole = "Add a role or direction with at least 3 characters.";
    if (profile.story.trim().length < 20) nextErrors.story = "Describe your path in at least 20 characters.";
    if (profile.proofPoints.length === 0) nextErrors.proofPoints = "Choose at least one proof point.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      setNotice("The plan needs a little more information.");
      return;
    }

    const nextPlan = buildReStartPlan(profile);
    setPlan(nextPlan);
    setCompleted([]);
    setSelectedMatch(null);
    setNotice("Your focused ReStart plan is ready.");
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const copyPositioning = async () => {
    if (!plan) return;
    try {
      await navigator.clipboard.writeText(plan.positioning);
      setNotice("Positioning statement copied.");
    } catch {
      setNotice("Copy was blocked by the browser. Select the statement manually.");
    }
  };

  const toggleCompleted = (id: string) => {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setNotice(completed.includes(id) ? "Step returned to the plan." : "Step marked complete.");
  };

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="ReStart Compass home"><span className="brand__mark"><Icon name="route"/></span><span><strong>ReStart Compass</strong><small>by ByteNova</small></span></a>
      <div className="topbar__meta"><span>EWGH 2026</span><span className="meta-dot"/>Built during the hackathon</div>
      <button className="text-button" type="button" onClick={loadDemo}>Load demo story</button>
    </header>

    <section className="hero" id="top">
      <div className="hero__copy">
        <p className="kicker">For women returning, pivoting, or beginning</p>
        <h1>Your path did not disappear.<br/><em>It changed shape.</em></h1>
        <p className="hero__intro">Turn projects, caregiving, self-learning, and limited time into one credible professional story and a plan you can actually finish.</p>
      </div>
      <div className="route-card" aria-label="ReStart process">
        <div><span>1</span><p><strong>Recognize</strong><small>what already counts</small></p></div>
        <div><span>2</span><p><strong>Reframe</strong><small>experience as evidence</small></p></div>
        <div><span>3</span><p><strong>Re-enter</strong><small>with one focused step</small></p></div>
      </div>
    </section>

    <section className="studio" aria-labelledby="studio-title">
      <div className="studio__heading">
        <div><p className="kicker">Your ReStart brief</p><h2 id="studio-title">Build around the life you have.</h2></div>
        <p>No perfect résumé required. This prototype uses only the information entered here and sends nothing anywhere.</p>
      </div>

      <form className="brief-form" noValidate onSubmit={generatePlan}>
        <fieldset className="form-section">
          <legend><span>01</span>Where are you going?</legend>
          <div className="field-grid">
            <label className="field" htmlFor="name"><span>Name for this plan</span><input id="name" value={profile.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="e.g. Lina" autoComplete="name"/>{errors.name && <small className="field-error" id="name-error">{errors.name}</small>}</label>
            <label className="field" htmlFor="targetRole"><span>Target role or direction</span><input id="targetRole" value={profile.targetRole} onChange={(event) => update("targetRole", event.target.value)} aria-invalid={Boolean(errors.targetRole)} aria-describedby={errors.targetRole ? "targetRole-error" : "targetRole-help"} placeholder="e.g. Junior data analyst"/><small className="field-help" id="targetRole-help">A direction is enough; it can change later.</small>{errors.targetRole && <small className="field-error" id="targetRole-error">{errors.targetRole}</small>}</label>
          </div>
          <label className="field" htmlFor="story"><span>Your path, in your own words</span><textarea id="story" rows={4} value={profile.story} onChange={(event) => update("story", event.target.value)} aria-invalid={Boolean(errors.story)} aria-describedby={errors.story ? "story-error" : "story-help"} placeholder="What have you kept learning, building, organizing, or solving?"/><small className="field-help" id="story-help">Care work and community work can demonstrate real skills.</small>{errors.story && <small className="field-error" id="story-error">{errors.story}</small>}</label>
        </fieldset>

        <fieldset className="form-section">
          <legend><span>02</span>What is realistic now?</legend>
          <div className="choice-block"><p id="goal-label">Current goal</p><div className="choice-row" role="radiogroup" aria-labelledby="goal-label">
            {([{"value":"return","label":"Return to work"},{"value":"pivot","label":"Change direction"},{"value":"first-role","label":"Find a first role"}] as Array<{value: Goal; label: string}>).map((item) => <button className={profile.goal === item.value ? "choice choice--active" : "choice"} key={item.value} type="button" role="radio" aria-checked={profile.goal === item.value} onClick={() => update("goal", item.value)}>{item.label}</button>)}
          </div></div>
          <div className="choice-block"><p id="hours-label">Time available each week</p><div className="choice-row" role="radiogroup" aria-labelledby="hours-label">
            {[3, 6, 10].map((hours) => <button className={profile.weeklyHours === hours ? "choice choice--active" : "choice"} key={hours} type="button" role="radio" aria-checked={profile.weeklyHours === hours} onClick={() => update("weeklyHours", hours)}><Icon name="time"/>{hours} hours</button>)}
          </div></div>
        </fieldset>

        <fieldset className="form-section" id="proofPoints" tabIndex={-1} aria-describedby={errors.proofPoints ? "proof-error" : "proof-help"}>
          <legend><span>03</span>What already proves your value?</legend>
          <p className="section-help" id="proof-help">Choose every statement you can support with a real example.</p>
          <div className="proof-grid">
            {proofOptions.map((proof) => <label className={profile.proofPoints.includes(proof) ? "proof proof--checked" : "proof"} key={proof}><input type="checkbox" checked={profile.proofPoints.includes(proof)} onChange={() => toggleProof(proof)}/><span className="proof__box"><Icon name="check"/></span><span>{proof}</span></label>)}
          </div>
          {errors.proofPoints && <p className="field-error" id="proof-error">{errors.proofPoints}</p>}
        </fieldset>

        <div className="form-action"><div><Icon name="spark"/><p><strong>Your plan stays explainable.</strong><small>No hidden score decides whether you belong.</small></p></div><button className="button button--primary" type="submit">Build my ReStart plan <Icon name="arrow"/></button></div>
      </form>
    </section>

    {plan && <section className="results" ref={resultRef} aria-labelledby="results-title">
      <div className="results__masthead">
        <div><p className="kicker">Your route is ready</p><h2 id="results-title">One week. One story. One application.</h2></div>
        <div className="progress" aria-label={`${completion}% of plan completed`}><strong>{completion}%</strong><span><i style={{ width: `${completion}%` }}/></span><small>{completed.length} of {plan.steps.length} steps completed</small></div>
      </div>

      <div className="positioning-card">
        <div className="positioning-card__icon"><Icon name="user"/></div>
        <div><p className="kicker">Professional positioning</p><blockquote>{plan.positioning}</blockquote><div className="signal-row">{plan.strengthSignals.map((signal) => <span key={signal}>{signal}</span>)}</div></div>
        <button className="icon-button" type="button" onClick={copyPositioning} aria-label="Copy positioning statement"><Icon name="copy"/></button>
      </div>

      <div className="plan-layout">
        <section className="week-plan" aria-labelledby="week-title">
          <div className="panel-heading"><div><p className="kicker">Your focused week</p><h3 id="week-title">{minutesLabel(plan.totalMinutes)} of deliberate progress</h3></div><span>{profile.weeklyHours}h available</span></div>
          <ol>
            {plan.steps.map((step, index) => {
              const isDone = completed.includes(step.id);
              return <li className={isDone ? "plan-step plan-step--done" : "plan-step"} key={step.id}>
                <button type="button" onClick={() => toggleCompleted(step.id)} aria-pressed={isDone} aria-label={`${isDone ? "Return" : "Mark"} ${step.title} ${isDone ? "to the plan" : "complete"}`}><span>{isDone ? <Icon name="check"/> : index + 1}</span></button>
                <div><div className="plan-step__title"><strong>{step.title}</strong><span>{minutesLabel(step.minutes)}</span></div><p>{step.detail}</p><small>Deliverable · {step.deliverable}</small></div>
              </li>;
            })}
          </ol>
        </section>

        <section className="matches" aria-labelledby="matches-title">
          <div className="panel-heading"><div><p className="kicker">Realistic matches</p><h3 id="matches-title">Start where your proof is strongest</h3></div></div>
          <div className="match-list">
            {plan.opportunities.map((match) => <button className={selectedMatch === match.id ? "match match--selected" : "match"} type="button" key={match.id} onClick={() => { setSelectedMatch(match.id); setNotice(`${match.title} selected as your focused application.`); }} aria-pressed={selectedMatch === match.id}>
              <span className="match__score">{match.fit}<small>% fit</small></span><span className="match__body"><strong>{match.title}</strong><small>{match.organization} · {match.remote ? "Remote" : "Hybrid"}</small><p>{match.reason}</p></span><span className="match__action">{selectedMatch === match.id ? <><Icon name="check"/>Selected</> : <>Choose<Icon name="arrow"/></>}</span>
            </button>)}
          </div>
          <p className="matches__note">Demo opportunities are synthetic. A production version would verify live listings before recommending them.</p>
        </section>
      </div>
    </section>}

    <footer><div><strong>ReStart Compass</strong><p>A focused hackathon prototype, built with AI-assisted development and human-reviewed decisions.</p></div><a href="#top">Back to the beginning ↑</a></footer>
    <div className="notice" role="status" aria-live="polite">{notice}</div>
  </main>;
}
