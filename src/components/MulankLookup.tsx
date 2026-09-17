import { useState } from "react";
import { calculateMulank } from "../utils/numerology";

interface Props {
  currentYear: number;
  onFound: (mulank: number) => void;
}

export default function MulankLookup({ currentYear, onFound }: Props) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{ mulank: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function daysInMonth(m: number, y: number) {
    return new Date(y, m, 0).getDate();
  }

  function handleLookup() {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    const valid =
      !isNaN(d) &&
      !isNaN(m) &&
      !isNaN(y) &&
      d >= 1 &&
      d <= 31 &&
      m >= 1 &&
      m <= 12 &&
      y >= 1900 &&
      y <= currentYear &&
      d <= daysInMonth(m, y);

    if (!valid) {
      setError("Please enter a valid date of birth (DD/MM/YYYY).");
      setResult(null);
      return;
    }

    const mulank = calculateMulank(d);
    setError(null);
    setResult({ mulank });
    onFound(mulank);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLookup();
    }
  }

  return (
    <section className="mt-11">
      <div
        className="rounded-xl2 px-6 py-6 flex items-center justify-between gap-6 flex-wrap shadow-card text-[#EFEDFB]"
        style={{ background: "linear-gradient(160deg,#181735,#2B2A55)" }}
      >
        <div>
          <h3 className="m-0 mb-1 text-lg">Know your Mulank?</h3>
          <p className="m-0 text-[13.5px] max-w-[38ch]" style={{ color: "#C9C6E8" }}>
            Enter your date of birth to find your Mulank (Driver Number) and jump to today's guidance
            for you.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-end flex-wrap">
            <Field label="DD" value={day} onChange={setDay} onKeyDown={handleKeyDown} placeholder="27" />
            <Field label="MM" value={month} onChange={setMonth} onKeyDown={handleKeyDown} placeholder="08" />
            <Field
              label="YYYY"
              value={year}
              onChange={setYear}
              onKeyDown={handleKeyDown}
              placeholder="1996"
              wide
            />
            <button
              type="button"
              onClick={handleLookup}
              className="px-5 py-3 rounded-[10px] border-none bg-marigold text-[#3A2600] font-semibold text-[12.5px] cursor-pointer hover:brightness-105 leading-none"
            >
              Find My Mulank
            </button>
          </div>
          <div aria-live="polite">
            {error && <div className="mt-3.5 text-[13px] text-[#F6C9C2]">{error}</div>}
            {result && !error && (
              <div className="mt-3.5 text-[13.5px]">
                Your Mulank: <b style={{ color: "#F6E3BE" }}>{result.mulank}</b> — showing today's
                guidance for you below.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  onKeyDown,
  placeholder,
  wide,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string;
  wide?: boolean;
}) {
  const id = `dob-${label.toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.08em] mb-1" style={{ color: "#B9B6DD" }}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`${wide ? "w-[88px]" : "w-[70px]"} px-2.5 py-2 rounded-[10px] border font-mono text-sm text-white bg-white/[0.08]`}
        style={{ borderColor: "rgba(255,255,255,0.25)" }}
      />
    </div>
  );
}
