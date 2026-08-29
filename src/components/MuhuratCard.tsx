import { useMemo, useState } from "react";
import { CITIES, CITY_MAP, DEFAULT_CITY_KEY } from "../utils/cities";
import { getCityLocalContext, formatDec, WEEKDAY_LONG } from "../utils/dateUtils";
import { calcSunTimes, fallbackSunTimes } from "../utils/sunCalc";
import {
  calculateAbhijitMuhurat,
  calculateAmritKaal,
  calculateBrahmaMuhurat,
  calculateRahuKaal,
  DAY_RULER,
} from "../utils/muhurat";
import Timeline from "./Timeline";

const GROUPS = Array.from(new Set(CITIES.map((c) => c.group)));

export default function MuhuratCard() {
  const [cityKey, setCityKey] = useState(DEFAULT_CITY_KEY);
  const city = CITY_MAP[cityKey];

  // Recomputed fresh on every render (cheap trig), and whenever the city changes.
  const { sun, usedFallback, ctx } = useMemo(() => {
    const ctx = getCityLocalContext(city.tz);
    try {
      const sun = calcSunTimes(ctx.year, ctx.month, ctx.day, city.lat, city.lon, ctx.offsetHours);
      return { sun, usedFallback: false, ctx };
    } catch {
      return { sun: fallbackSunTimes(), usedFallback: true, ctx };
    }
  }, [city]);

  const rahu = calculateRahuKaal(sun.sunrise, sun.sunset, ctx.weekdayIndex);
  const amrit = calculateAmritKaal(sun.sunrise, sun.sunset, ctx.weekdayIndex);
  const abhijit = calculateAbhijitMuhurat(sun.sunrise, sun.sunset);
  const brahma = calculateBrahmaMuhurat(sun.sunrise);

  return (
    <section className="mt-11">
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
        <h2 className="text-xl font-semibold text-indigoDeep font-display m-0">Today's Muhurat</h2>
        <p className="text-[13px] text-inkFaint m-0">
          {WEEKDAY_LONG[ctx.weekdayIndex]} is ruled by {DAY_RULER[ctx.weekdayIndex]} · {city.label}
        </p>
      </div>

      <div className="bg-white border border-black/10 rounded-xl2 shadow-card px-5 pt-5 pb-2">
        <div className="flex justify-between items-center gap-4 flex-wrap mb-1.5">
          <div className="flex items-center gap-2">
            <label htmlFor="citySelect" className="text-xs text-inkFaint">
              Location
            </label>
            <select
              id="citySelect"
              value={cityKey}
              onChange={(e) => setCityKey(e.target.value)}
              className="text-[13.5px] border border-black/[0.18] bg-paper rounded-full px-3.5 py-1.5 cursor-pointer"
              aria-label="Select city for sunrise/sunset based Muhurat calculations"
            >
              {GROUPS.map((group) => (
                <optgroup key={group} label={group}>
                  {CITIES.filter((c) => c.group === group).map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <span className="text-[13px] text-inkFaint font-mono">
            sunrise {formatDec(sun.sunrise)} · sunset {formatDec(sun.sunset)} · {city.label} local time (
            {ctx.tzLabel})
          </span>
        </div>

        {usedFallback && (
          <div className="text-[12.5px] text-[#8A5A00] bg-[#FFF6E4] border border-[#F3DFB0] rounded-lg px-3 py-2 mb-3.5">
            Live sunrise/sunset calculation had an issue for this location, so approximate seasonal
            timings are shown instead.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4.5">
          <MuhuratTile
            title="Rahu Kaal"
            range={rahu}
            barColor="#BE4A3C"
            note="Traditionally inauspicious to begin new work"
          />
          <MuhuratTile
            title="Amrit Kaal"
            range={amrit}
            barColor="#517A5B"
            note="Amrit Choghadiya · favourable window"
          />
          <MuhuratTile
            title="Abhijit Muhurat"
            range={abhijit}
            barColor="#DE9A34"
            note="8th muhurta, around solar noon"
          />
          <MuhuratTile
            title="Brahma Muhurat"
            range={brahma}
            barColor="#2B2A55"
            note="96 to 48 minutes before sunrise"
          />
        </div>

        <Timeline sun={sun} brahma={brahma} amrit={amrit} abhijit={abhijit} rahu={rahu} city={city} />

        <p className="text-[11.5px] text-inkFaint pb-4">
          Times are calculated from sunrise/sunset for the selected city using the standard solar
          sunrise equation, then combined with traditional muhurat rules, and shown in that city's own
          local time. Panchang sources may differ by a few minutes. The Mulank report and daily date
          above always follow IST, regardless of the location selected here.
        </p>
      </div>
    </section>
  );
}

function MuhuratTile({
  title,
  range,
  barColor,
  note,
}: {
  title: string;
  range: { start: number; end: number };
  barColor: string;
  note: string;
}) {
  return (
    <div className="relative overflow-hidden border border-black/10 rounded-xl px-3.5 py-3.5">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: barColor }} />
      <h4 className="m-0 mb-1.5 text-[13px] font-semibold text-ink">{title}</h4>
      <div className="font-mono text-[15px] text-indigoDeep font-semibold">
        {formatDec(range.start)} – {formatDec(range.end)}
      </div>
      <div className="text-[11.5px] text-inkFaint mt-1">{note}</div>
    </div>
  );
}
