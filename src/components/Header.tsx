import ISTClock from "./ISTClock";
import { formatLongDate, ISTDate } from "../utils/dateUtils";

interface Props {
  istDate: ISTDate | null;
}

export default function Header({ istDate }: Props) {
  return (
    <header className="border-b border-black/10 px-5 pt-9 pb-7 bg-gradient-to-b from-white/50 to-transparent">
      <div className="max-w-[1080px] mx-auto flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-inkFaint mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold" />
            Daily · Numerology &amp; Panchang
          </div>
          <h1 className="font-display text-[clamp(28px,4vw,40px)] font-bold text-indigoDeep mb-1.5">
            Daily Mulank Guide
          </h1>
          <p className="text-inkSoft text-[15.5px] max-w-[46ch] m-0">
            Numerology &amp; Vedic astrology inspired guidance for today, recalculated automatically at
            midnight IST.
          </p>
        </div>

        <div className="text-center px-4.5 py-3.5 border border-black/[0.18] rounded-xl bg-white shadow-card min-w-[230px]">
          <div className="text-[13.5px] text-inkSoft mb-0.5">
            {istDate ? formatLongDate(istDate) : <span className="skel inline-block w-40">Loading…</span>}
          </div>
          <div className="text-2xl font-semibold text-indigoDeep">
            <ISTClock />
          </div>
          <div className="text-[11px] text-inkFaint uppercase tracking-[0.1em] mt-0.5">
            Asia/Kolkata · IST
          </div>
        </div>
      </div>
    </header>
  );
}
