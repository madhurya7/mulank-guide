import { useMemo, useRef } from "react";
import { getDailyReport } from "../utils/numerology";
import { formatLongDate, ISTDate } from "../utils/dateUtils";
import MulankCard from "./MulankCard";

interface Props {
  istDate: ISTDate;
  highlightedMulank: number | null;
}

export interface MulankGridHandle {
  scrollToMulank: (m: number) => void;
}

export default function MulankGrid({ istDate, highlightedMulank }: Props) {
  const report = useMemo(() => getDailyReport(istDate.dateKey), [istDate.dateKey]);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section className="mt-11">
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
        <h2 className="text-xl font-semibold text-indigoDeep font-display m-0">Mulank 1 – 9</h2>
        <p className="text-[13px] text-inkFaint m-0">Report for {formatLongDate(istDate)}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {numbers.map((m) => (
          <MulankCard key={m} mulank={m} data={report[m]} highlighted={highlightedMulank === m} />
        ))}
      </div>
    </section>
  );
}
