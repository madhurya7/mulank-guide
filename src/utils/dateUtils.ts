export const IST_TZ = "Asia/Kolkata";
export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEKDAY_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
export const MONTH_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export interface ISTDate {
  year: number;
  month: number;
  day: number;
  weekdayIndex: number;
  weekdayName: string;
  dateKey: string;
}

export interface ISTTime {
  hour: number;
  minute: number;
  second: number;
  decimal: number;
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : "" + n;
}

function getISTRawParts(now: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: IST_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const parts: Record<string, string> = {};
  fmt.formatToParts(now).forEach((p) => {
    if (p.type !== "literal") parts[p.type] = p.value;
  });
  return {
    year: parseInt(parts.year, 10),
    month: parseInt(parts.month, 10),
    day: parseInt(parts.day, 10),
    hour: parseInt(parts.hour === "24" ? "0" : parts.hour, 10),
    minute: parseInt(parts.minute, 10),
    second: parseInt(parts.second, 10),
    weekdayIndex: WEEKDAY_SHORT.indexOf(parts.weekday),
  };
}

export function getISTDate(now: Date = new Date()): ISTDate {
  const p = getISTRawParts(now);
  return {
    year: p.year,
    month: p.month,
    day: p.day,
    weekdayIndex: p.weekdayIndex,
    weekdayName: WEEKDAY_LONG[p.weekdayIndex],
    dateKey: `${p.year}-${pad2(p.month)}-${pad2(p.day)}`,
  };
}

export function getISTTime(now: Date = new Date()): ISTTime {
  const p = getISTRawParts(now);
  return {
    hour: p.hour,
    minute: p.minute,
    second: p.second,
    decimal: p.hour + p.minute / 60 + p.second / 3600,
  };
}

export function formatClock(t: ISTTime): string {
  let h = t.hour % 12;
  if (h === 0) h = 12;
  const ampm = t.hour >= 12 ? "PM" : "AM";
  return `${pad2(h)}:${pad2(t.minute)}:${pad2(t.second)} ${ampm}`;
}

export function formatLongDate(d: ISTDate): string {
  return `${WEEKDAY_LONG[d.weekdayIndex]}, ${d.day} ${MONTH_LONG[d.month - 1]} ${d.year}`;
}

/** Formats a decimal-hour value (e.g. 6.25 -> "06:15 AM"). Wraps 0-24. */
export function formatDec(dec: number): string {
  dec = ((dec % 24) + 24) % 24;
  let h = Math.floor(dec);
  let m = Math.round((dec - h) * 60);
  if (m === 60) {
    m = 0;
    h += 1;
  }
  h = ((h % 24) + 24) % 24;
  let hh = h % 12;
  if (hh === 0) hh = 12;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${pad2(hh)}:${pad2(m)} ${ampm}`;
}

export interface CityLocalContext {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekdayIndex: number;
  offsetHours: number;
  tzLabel: string;
}

/**
 * Resolves a city's own local calendar date, weekday and current UTC offset,
 * reading the live IANA timezone so DST is handled automatically.
 */
export function getCityLocalContext(tz: string, now: Date = new Date()): CityLocalContext {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short",
    timeZoneName: "shortOffset",
  });
  const parts: Record<string, string> = {};
  dtf.formatToParts(now).forEach((p) => {
    if (p.type !== "literal") parts[p.type] = p.value;
  });

  let offsetHours = 0;
  const tzName = parts.timeZoneName || "GMT";
  const m = tzName.match(/GMT([+-]\d+)(?::(\d+))?/);
  if (m) {
    offsetHours = parseInt(m[1], 10);
    if (m[2]) offsetHours += (offsetHours < 0 ? -1 : 1) * (parseInt(m[2], 10) / 60);
  }

  return {
    year: parseInt(parts.year, 10),
    month: parseInt(parts.month, 10),
    day: parseInt(parts.day, 10),
    hour: parseInt(parts.hour === "24" ? "0" : parts.hour, 10),
    minute: parseInt(parts.minute, 10),
    second: parseInt(parts.second, 10),
    weekdayIndex: WEEKDAY_SHORT.indexOf(parts.weekday),
    offsetHours,
    tzLabel: tzName.replace("GMT", "UTC"),
  };
}
