import { forwardRef } from "react";
import { MulankDayReport } from "../utils/numerology";

interface Props {
  mulank: number;
  data: MulankDayReport;
  highlighted: boolean;
}

const MulankCard = forwardRef<HTMLDivElement, Props>(({ mulank, data, highlighted }, ref) => {
  return (
    <article
      ref={ref}
      id={`mulank-${mulank}`}
      tabIndex={-1}
      className={`bg-white border rounded-xl2 shadow-card px-6 py-6 transition-all hover:-translate-y-0.5 ${
      highlighted ? "border-marigold ring-4 ring-marigoldSoft" : "border-black/10 hover:border-black/[0.18]"
      }`}
      style={{ scrollMarginTop: "20px", margin: "16px" }}
    >
      <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-display font-bold text-base bg-paper2 text-indigoDeep">
        {mulank}
        </div>
        <div>
        <div className="text-xs text-inkFaint">Mulank {mulank}</div>
        <div className="text-xs text-inkFaint">
          <b className="text-inkSoft font-semibold">{data.planet}</b>
        </div>
        </div>
      </div>
      </div>

      <div className="text-xs text-inkSoft mb-2.5 flex items-center gap-2 flex-wrap">
      <div className="flex gap-1.5">
        {data.colors.map((c, i) => (
        <span
          key={i}
          className="w-4 h-4 rounded-[5px] border border-black/[0.12] inline-block"
          style={{ background: c.hex }}
          title={c.name}
        />
        ))}
      </div>
      <span className="text-inkFaint">{data.colors.map((c) => c.name).join(" · ")}</span>
      </div>

      <p className="text-[13.5px] leading-relaxed text-ink mb-3">{data.forecast}</p>

      <div className="grid grid-cols-2 gap-x-3.5 gap-y-1.5">
      <RatingRow label="Work" value={data.ratings.work} />
      <RatingRow label="Money" value={data.ratings.money} />
      <RatingRow label="Relationships" value={data.ratings.relationships} />
      <RatingRow label="Energy" value={data.ratings.energy} />
      </div>
    </article>
  );
});

MulankCard.displayName = "MulankCard";
export default MulankCard;

function RatingRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-[11.5px] text-inkSoft">
      <span>{label}</span>
      <span className="font-mono tracking-wide text-marigold" aria-label={`${label}: ${value} out of 5`}>
        {"★".repeat(value)}
        <span className="text-black/[0.18]">{"★".repeat(5 - value)}</span>
      </span>
    </div>
  );
}
