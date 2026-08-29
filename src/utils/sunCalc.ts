export interface SunTimes {
  sunrise: number; // decimal hours, local clock of the target offset
  sunset: number;
}

function dayOfYear(year: number, month: number, day: number): number {
  const start = Date.UTC(year, 0, 0);
  const target = Date.UTC(year, month - 1, day);
  return Math.round((target - start) / 86400000);
}

function norm(x: number, mod: number): number {
  x = x % mod;
  if (x < 0) x += mod;
  return x;
}

export class SunNeverRisesError extends Error {}
export class SunNeverSetsError extends Error {}

/**
 * Standard sunrise/sunset ("Sunrise Equation") algorithm, as documented in the
 * Almanac for Computers (1990) / commonly cited NOAA formulation.
 * Returns decimal-hour local times for the given latitude/longitude/UTC offset.
 */
export function calcSunTimes(
  year: number,
  month: number,
  day: number,
  lat: number,
  lon: number,
  offsetHours: number
): SunTimes {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const N = dayOfYear(year, month, day);
  const zenith = 90.833;

  function calc(isSunrise: boolean): number {
    const lngHour = lon / 15;
    const t = N + (((isSunrise ? 6 : 18) - lngHour) / 24);
    const M = 0.9856 * t - 3.289;
    let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
    L = norm(L, 360);
    let RA = deg * Math.atan(0.91764 * Math.tan(L * rad));
    RA = norm(RA, 360);
    const Lq = Math.floor(L / 90) * 90;
    const RAq = Math.floor(RA / 90) * 90;
    RA = (RA + (Lq - RAq)) / 15;
    const sinDec = 0.39782 * Math.sin(L * rad);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH =
      (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
    if (cosH > 1) throw new SunNeverRisesError("Sun never rises at this location/date");
    if (cosH < -1) throw new SunNeverSetsError("Sun never sets at this location/date");
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    const UT = norm(T - lngHour, 24);
    return norm(UT + offsetHours, 24); // convert UT -> the target local clock
  }

  return { sunrise: calc(true), sunset: calc(false) };
}

/** Seasonally reasonable fallback if the calculation ever fails. */
export function fallbackSunTimes(): SunTimes {
  return { sunrise: 6.0, sunset: 18.25 };
}
