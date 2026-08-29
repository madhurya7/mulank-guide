export function calculateMulank(day: number): number {
  let n = day;
  while (n > 9) {
    n = String(n)
      .split("")
      .reduce((a, c) => a + parseInt(c, 10), 0);
  }
  return n;
}

export interface MulankInfo {
  planet: string;
  keyword: string;
  colors: string[];
  hex: string[];
}

export const MULANK_INFO: Record<number, MulankInfo> = {
  1: { planet: "Sun (Surya)", keyword: "Leadership", colors: ["Gold", "Orange", "Deep Red"], hex: ["#DE9A34", "#E07A3E", "#8C2E24"] },
  2: { planet: "Moon (Chandra)", keyword: "Emotion & Intuition", colors: ["White", "Cream", "Sea Green"], hex: ["#F4F1E8", "#E8DFC3", "#5F8F79"] },
  3: { planet: "Jupiter (Guru)", keyword: "Growth & Wisdom", colors: ["Yellow", "Saffron", "Purple"], hex: ["#E8C13A", "#E08D2E", "#6C4A8C"] },
  4: { planet: "Rahu", keyword: "Discipline & Structure", colors: ["Grey", "Steel Blue", "Charcoal"], hex: ["#9A9AA5", "#5E7A99", "#3C3B47"] },
  5: { planet: "Mercury (Budh)", keyword: "Communication & Change", colors: ["Green", "Turquoise", "Light Green"], hex: ["#4E8F5C", "#3F9E96", "#8BC08A"] },
  6: { planet: "Venus (Shukra)", keyword: "Harmony & Beauty", colors: ["Pink", "Light Blue", "White"], hex: ["#E3A9B4", "#A9C6DE", "#F4F1E8"] },
  7: { planet: "Ketu", keyword: "Reflection & Insight", colors: ["Sea Green", "Off-White", "Grey"], hex: ["#5F8F79", "#EDE9DD", "#9A9AA5"] },
  8: { planet: "Saturn (Shani)", keyword: "Patience & Karma", colors: ["Black", "Navy Blue", "Dark Grey"], hex: ["#232230", "#233A63", "#4B4A57"] },
  9: { planet: "Mars (Mangal)", keyword: "Energy & Courage", colors: ["Red", "Coral", "Crimson"], hex: ["#BE4A3C", "#D9714F", "#8C2233"] },
};

const FORECASTS: Record<number, string[]> = {
  1: [
    "The Sun lights up your confidence today. Leadership moments may appear at work, so voice your ideas plainly. Keep spending steady rather than chasing quick wins. Warmth draws people closer in relationships, though a lighter tone helps. Energy runs high — channel it into one priority instead of many small tasks.",
    "A day suited to taking the lead. Colleagues may look to you for direction, so trust your first instinct on important calls. Money matters favour patience over impulsive moves. Loved ones respond best to honest, direct conversation rather than hints. Save demanding tasks for the hours your energy naturally peaks.",
    "Independent work suits you better than group tasks that slow you down today. Read financial paperwork twice before signing anything. A close relationship may ask you to listen as much as you lead. Physical energy is strong through the morning, easing by evening, so plan accordingly.",
    "Quiet recognition may come your way — use it to open doors rather than prove a point. Money flow stays stable if you resist unnecessary risk. Relationships benefit from a softer tone than usual. Your sharpest hours arrive mid-day; place your most important task there.",
  ],
  2: [
    "The Moon heightens sensitivity today, making it a good day to trust your gut over spreadsheets. Financial decisions benefit from sleeping on them first. Emotional conversations flow more easily than usual, a fair time to repair a small rift. Energy comes in waves — rest when it dips.",
    "Intuition runs strong; a hunch about work or people is worth noting down. Avoid large purchases made on impulse. Family and close friends may need extra patience rather than solutions. Keep your schedule flexible, since mood and focus may shift more than once through the day.",
    "A reflective day — routine tasks go smoother than anything requiring confrontation. Review, rather than commit to, new financial plans. Relationships deepen through small gestures more than big declarations. Energy is gentler than usual, so pace yourself and avoid overbooking the evening.",
    "Emotional clarity arrives if you allow quiet moments between tasks. Money matters are fine as long as you separate wants from needs. A caring word to someone close goes further than expected. Physical energy responds well to rest and water rather than caffeine today.",
  ],
  3: [
    "Jupiter's optimism favours learning and long-term planning today. Work conversations about growth or expansion land well. Money is fine for planned expenses, less so for spontaneous ones. Relationships benefit from generosity and honest encouragement. Energy stays steady, better suited to sustained effort than short bursts.",
    "A good day to teach, mentor, or share knowledge — it comes back to you in goodwill. Financial advice from a trusted source is worth hearing out. In relationships, a broader perspective helps settle a minor disagreement. Keep ambitions realistic; energy favours steady progress over big leaps.",
    "Wisdom and patience are your allies today, especially in negotiations or planning meetings. Avoid over-committing financially even if an opportunity looks promising. Relationships thrive on shared plans and honest optimism. Energy is calm and reliable, ideal for follow-through rather than speed.",
    "Expansion is favoured — a course, trip, or new responsibility may appeal. Money matters improve with a long view rather than short-term thinking. A mentor or elder's advice in relationships is worth taking seriously. Physical energy is moderate; pace bigger efforts across the day.",
  ],
  4: [
    "Structure and discipline serve you well today, even if the day feels a little unpredictable. Double-check details before finalising money matters. Relationships need clear communication rather than assumptions. Energy is inconsistent, so build in short breaks rather than pushing through fatigue.",
    "Rahu's restless streak may bring sudden changes to plans — stay adaptable rather than rigid. Avoid financial shortcuts that skip due diligence. In relationships, patience with an unpredictable mood, yours or theirs, helps. Physical energy comes in short, sharp bursts today rather than a steady flow.",
    "A day for organising rather than starting something entirely new. Money matters need extra caution around fine print or hidden terms. Relationships benefit from grounding conversations, away from distractions. Energy is best used on practical, structured tasks rather than open-ended ones.",
    "Unexpected information may reshape your plans — treat it as useful rather than disruptive. Hold off on major financial commitments until things settle. A calm, steady tone helps smooth over any tension in relationships. Keep your day flexible and your energy reserved for the unexpected.",
  ],
  5: [
    "Mercury sharpens communication today — conversations, emails and negotiations go smoothly. It is a fair day for adapting to unexpected changes rather than resisting them. Keep financial decisions simple and avoid rushing them. Relationships benefit from clear, light conversation. Energy is quick and alert, best for varied tasks.",
    "Networking and short trips are favoured; new information reaches you at a useful moment. Avoid impulsive money moves, especially anything requiring quick signatures. Wit and humour smooth over minor friction in relationships. Energy is scattered but active — good for multitasking, less so for deep focus.",
    "A talkative, curious day well suited to writing, planning or catching up on messages. Review money matters carefully since details matter more than usual. Relationships improve through honest, light-hearted conversation. Physical energy stays steady if you avoid overloading your schedule.",
    "Your adaptability is an asset today, especially if plans shift at short notice. Keep financial paperwork organised rather than postponed. In relationships, listening carefully prevents a small misunderstanding from growing. Energy favours short focused efforts over one long stretch of work.",
  ],
  6: [
    "Venus favours harmony today, making it a pleasant day for relationships and creative work. Financially, comfort spending is fine in moderation but track it. A kind gesture toward a partner or friend is well received. Energy is calm and steady, well suited to collaborative tasks.",
    "Beauty, comfort and connection are highlighted — a good day for shared meals or creative projects. Avoid overspending on non-essentials. Relationships deepen through appreciation and small acts of care. Energy stays gentle, so pace physical activity rather than pushing hard.",
    "Diplomacy comes easily today, useful for smoothing over a workplace disagreement. Money matters are stable if you separate comfort from indulgence. Romantic and close relationships benefit from quality time over grand gestures. Energy is soft but consistent through the day.",
    "A good day for anything involving design, aesthetics or partnership decisions. Keep an eye on shared expenses if managing money jointly. Relationships flourish with sincerity rather than flattery. Physical energy responds well to rest, music or calm surroundings.",
  ],
  7: [
    "Ketu's introspective pull favours quiet focus over crowded schedules today. Financial decisions benefit from stepping back rather than deciding on the spot. Relationships need space as much as attention right now. Energy is inward-facing, well suited to research or solitary work.",
    "A good day to detach from noise and reconnect with your own priorities. Avoid financial decisions driven by pressure from others. In relationships, a little distance may actually help clarity. Physical energy is moderate; rest supports it more than activity today.",
    "Insight comes through reflection rather than action today — journalling or quiet planning suits the mood. Keep money matters simple and avoid new commitments. Relationships benefit from patience rather than pushing for resolution. Energy is subtle, better used for thinking than doing.",
    "A day for letting go of what no longer serves you, whether a habit, task or expectation. Financially, review rather than expand. Relationships improve when you release the need to control outcomes. Energy is calm; use it for tasks that reward patience.",
  ],
  8: [
    "Saturn asks for patience and steady effort today rather than shortcuts. Financial discipline pays off, even if progress feels slow. Relationships need consistency more than grand gestures right now. Energy is measured, best suited to long tasks rather than quick wins.",
    "Responsibility takes centre stage — a pending duty at work or home is worth addressing directly. Avoid financial risks that promise fast results. In relationships, showing up reliably matters more than words today. Physical energy is steady but not high, so pace yourself.",
    "A disciplined, methodical day favours finishing what you started rather than beginning something new. Money matters improve with careful budgeting. Relationships benefit from honesty about limits and boundaries. Energy is grounded, well suited to routine and structured work.",
    "Karma-driven themes may surface — past effort in a project or relationship starts to show results. Keep financial commitments realistic rather than ambitious. A patient, steady approach helps a strained relationship. Energy favours consistency over intensity today.",
  ],
  9: [
    "Mars fuels courage and drive today, useful for tackling a task you have been postponing. Financial boldness should be tempered with a quick second check. Relationships benefit from directness, though a calmer tone avoids unnecessary friction. Energy is high and best used early in the day.",
    "A competitive, active day well suited to physical effort or decisive action at work. Avoid financial decisions made in the heat of the moment. In relationships, passion runs high — channel it constructively rather than into arguments. Energy is strong but short-tempered if unmanaged.",
    "Initiative is well rewarded today, especially in situations needing quick, confident decisions. Money matters favour bold but informed choices over guesswork. Relationships thrive on honesty, provided it is delivered with patience. Physical energy is high, so use it before it turns restless.",
    "A day for action rather than deliberation — momentum builds once you start. Keep financial risks calculated rather than impulsive. Relationships benefit from resolving tension directly instead of letting it simmer. Energy is intense, best balanced with physical activity to avoid restlessness.",
  ],
};

// --- Deterministic seeded RNG (mulberry32), keyed by date + mulank + field ---
function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededInt(key: string, max: number): number {
  const rng = mulberry32(hashString(key));
  return Math.floor(rng() * max);
}

export interface LuckyColor {
  name: string;
  hex: string;
}

export function getLuckyColors(mulank: number, dateKey: string): LuckyColor[] {
  const info = MULANK_INFO[mulank];
  const primaryIdx = seededInt(`${dateKey}|${mulank}|color1`, info.colors.length);
  let secondaryIdx = seededInt(`${dateKey}|${mulank}|color2`, info.colors.length);
  if (secondaryIdx === primaryIdx) secondaryIdx = (secondaryIdx + 1) % info.colors.length;
  return [
    { name: info.colors[primaryIdx], hex: info.hex[primaryIdx] },
    { name: info.colors[secondaryIdx], hex: info.hex[secondaryIdx] },
  ];
}

function getRating(dateKey: string, mulank: number, field: string): number {
  return 2 + seededInt(`${dateKey}|${mulank}|rating|${field}`, 4); // 2-5, avoids overly harsh 1s
}

export interface MulankDayReport {
  planet: string;
  keyword: string;
  colors: LuckyColor[];
  forecast: string;
  ratings: {
    work: number;
    money: number;
    relationships: number;
    energy: number;
  };
}

export type DailyReport = Record<number, MulankDayReport>;

const reportCache: Record<string, DailyReport> = {};

/** Same date always returns the same report; different dates vary deterministically. */
export function getDailyReport(dateKey: string): DailyReport {
  if (reportCache[dateKey]) return reportCache[dateKey];
  const report: DailyReport = {};
  for (let m = 1; m <= 9; m++) {
    const variants = FORECASTS[m];
    const vIdx = seededInt(`${dateKey}|${m}|forecast`, variants.length);
    report[m] = {
      planet: MULANK_INFO[m].planet,
      keyword: MULANK_INFO[m].keyword,
      colors: getLuckyColors(m, dateKey),
      forecast: variants[vIdx],
      ratings: {
        work: getRating(dateKey, m, "work"),
        money: getRating(dateKey, m, "money"),
        relationships: getRating(dateKey, m, "relationships"),
        energy: getRating(dateKey, m, "energy"),
      },
    };
  }
  reportCache[dateKey] = report;
  return report;
}
