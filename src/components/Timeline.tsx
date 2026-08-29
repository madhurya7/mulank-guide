import { useEffect, useState } from "react";
import { formatDec, getCityLocalContext } from "../utils/dateUtils";
import { TimeRange } from "../utils/muhurat";
import { SunTimes } from "../utils/sunCalc";
import { City } from "../utils/cities";

interface Props {
  sun: SunTimes;
  brahma: TimeRange;
  amrit: TimeRange;
  abhijit: TimeRange;
  rahu: TimeRange;
  city: City;
}

export default function Timeline({ sun, brahma, amrit, abhijit, rahu, city }: Props) {
  const [nowDecimal, setNowDecimal] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      const ctx = getCityLocalContext(city.tz);
      setNowDecimal(ctx.hour + ctx.minute / 60 + ctx.second / 3600);
    }
    update();
    const id = setInterval(update, 60000); // reposition only, no recalculation
    return () => clearInterval(id);
  }, [city.tz]);

  const rangeStart = brahma.start - 0.25;
  const rangeEnd = sun.sunset + 0.4;
  const span = rangeEnd - rangeStart;
  const pct = (v: number) => Math.max(0, Math.min(100, ((v - rangeStart) / span) * 100));

  const segments: { range: TimeRange; color: string; z: number }[] = [
    { range: brahma, color: "var(--tl-indigo, #2B2A55)", z: 1 },
    { range: amrit, color: "var(--tl-sage, #517A5B)", z: 2 },
    { range: abhijit, color: "var(--tl-marigold, #DE9A34)", z: 3 },
    { range: rahu, color: "var(--tl-sindoor, #BE4A3C)", z: 4 },
  ];

  const showNowDot = nowDecimal !== null && nowDecimal >= rangeStart && nowDecimal <= rangeEnd;

  return (
    <div className="pt-1 pb-5">
      <div className="flex justify-between text-[11px] text-inkFaint mb-1.5 font-mono">
        <span>{formatDec(rangeStart)}</span>
        <span>{formatDec(rangeEnd)}</span>
      </div>
      <div
        className="relative h-[34px] rounded-full overflow-hidden border border-black/10"
        style={{ background: "#F1EAD9" }}
        role="img"
        aria-label="Timeline of today's sun and muhurat periods"
      >
        {segments.map((s, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 opacity-85"
            style={{
              left: `${pct(s.range.start)}%`,
              width: `${Math.max(0.6, pct(s.range.end) - pct(s.range.start))}%`,
              background: s.color,
              zIndex: s.z,
            }}
          />
        ))}
        {[sun.sunrise, sun.sunset].map((v, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-black/[0.18]"
            style={{ left: `${pct(v)}%` }}
          />
        ))}
        {showNowDot && (
          <div
            className="absolute -top-1 w-2.5 h-2.5 rounded-full -translate-x-1/2"
            style={{
              left: `${pct(nowDecimal as number)}%`,
              background: "#181735",
              boxShadow: "0 0 0 4px rgba(43,42,85,0.18)",
            }}
            title={`Now (${city.label})`}
          />
        )}
      </div>
      <div className="flex gap-4 flex-wrap mt-3 text-xs text-inkSoft">
        <Legend color="#2B2A55" label="Brahma Muhurat" />
        <Legend color="#517A5B" label="Amrit Kaal" />
        <Legend color="#DE9A34" label="Abhijit Muhurat" />
        <Legend color="#BE4A3C" label="Rahu Kaal" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-sm inline-block" style={{ background: color }} />
      {label}
    </span>
  );
}
