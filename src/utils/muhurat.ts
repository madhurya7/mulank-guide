export interface TimeRange {
  start: number; // decimal hours
  end: number;
}

// Rahu Kaal: daytime split into 8 equal parts, one part assigned per weekday (0=Sun..6=Sat)
const RAHU_SEGMENT_BY_WEEKDAY = [7, 1, 6, 4, 5, 3, 2]; // 0-based segment index

export function calculateRahuKaal(sunrise: number, sunset: number, weekdayIndex: number): TimeRange {
  const segDur = (sunset - sunrise) / 8;
  const idx = RAHU_SEGMENT_BY_WEEKDAY[weekdayIndex];
  const start = sunrise + idx * segDur;
  return { start, end: start + segDur };
}

// Amrit Kaal via the "Amrit Choghadiya": day divided into 8 slots cycling through
// the traditional 7-part Choghadiya sequence, starting slot fixed per weekday.
const CHOGHADIYA_ORDER = ["Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog"];
const CHOGHADIYA_DAY_START = ["Udveg", "Amrit", "Rog", "Labh", "Shubh", "Chal", "Kaal"]; // 0=Sun..6=Sat

export function calculateAmritKaal(sunrise: number, sunset: number, weekdayIndex: number): TimeRange {
  const segDur = (sunset - sunrise) / 8;
  const startLabel = CHOGHADIYA_DAY_START[weekdayIndex];
  const startIdx = CHOGHADIYA_ORDER.indexOf(startLabel);
  for (let i = 0; i < 8; i++) {
    const label = CHOGHADIYA_ORDER[(startIdx + i) % 7];
    if (label === "Amrit") {
      const start = sunrise + i * segDur;
      return { start, end: start + segDur };
    }
  }
  const start = sunrise + segDur;
  return { start, end: start + segDur };
}

// Abhijit Muhurat: 8th of 15 muhurtas dividing daytime, centred on solar noon
export function calculateAbhijitMuhurat(sunrise: number, sunset: number): TimeRange {
  const solarNoon = (sunrise + sunset) / 2;
  const muhurtaDur = (sunset - sunrise) / 15;
  return { start: solarNoon - muhurtaDur / 2, end: solarNoon + muhurtaDur / 2 };
}

// Brahma Muhurat: 1h36m to 48m before sunrise
export function calculateBrahmaMuhurat(sunrise: number): TimeRange {
  return { start: sunrise - 1.6, end: sunrise - 0.8 };
}

export const DAY_RULER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]; // 0=Sun..6=Sat
