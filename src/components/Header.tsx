import ISTClock from "./ISTClock";
import { formatLongDate, ISTDate } from "../utils/dateUtils";
import profilePhoto from "../assets/profile-photo.jpg";

interface Props {
  istDate: ISTDate | null;
}

// ---- Edit these two lines with your actual name and title ----
const PROFILE_NAME = "Daily Numerology & Panchang";
const PROFILE_TITLE = "Numerologist & Vedic Astrology Guide";
// -----------------------------------------------------------------

export default function Header({ istDate }: Props) {
  return (
    <header className="relative">
      {/* Gradient hero panel */}
      <div
        className="relative overflow-hidden pt-8 pb-20 sm:pb-24"
        style={{
          background:
            "radial-gradient(120% 160% at 12% -20%, #34335F 0%, #201F45 42%, #14132C 100%)",
        }}
      >
        {/* soft decorative glow, kept subtle and off to the side */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] w-[380px] h-[380px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #DE9A34 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-30%] left-[-10%] w-[320px] h-[320px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #517A5B 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-[1080px] mx-auto px-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="animate-profile-eyebrow flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold" />
            Daily · Numerology &amp; Panchang
          </div>

          <div className="text-center px-4.5 py-3.5 rounded-xl bg-white/95 backdrop-blur shadow-card min-w-[200px] self-center sm:self-auto w-fit">
            <div className="text-[13.5px] text-inkSoft mb-0.5">
              {istDate ? (
                formatLongDate(istDate)
              ) : (
                <span className="skel inline-block w-40">Loading…</span>
              )}
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-indigoDeep whitespace-nowrap">
              <ISTClock />
            </div>
            <div className="text-[11px] text-inkFaint uppercase tracking-[0.1em] mt-0.5">
              Asia/India· IST
            </div>
          </div>
        </div>
      </div>

      {/* Profile block: photo overlaps the gradient panel's bottom edge */}
      <div className="relative z-10 max-w-[1080px] mx-auto px-5 -mt-16 sm:-mt-20 flex flex-col items-center text-center pb-9">
        <div className="animate-profile-photo">
          <img
            src={profilePhoto}
            alt={PROFILE_NAME}
            width={176}
            height={176}
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover ring-4 ring-white shadow-[0_16px_40px_-12px_rgba(24,23,53,0.45)]"
          />
        </div>

        <h1 className="animate-profile-name mt-4 font-display text-[clamp(24px,3.4vw,34px)] font-bold text-indigoDeep">
          {PROFILE_NAME}
        </h1>
        <p className="animate-profile-subtitle mt-1 text-marigold font-medium text-[14.5px]">
          {PROFILE_TITLE}
        </p>
        <p className="animate-profile-subtitle mt-3 text-inkSoft text-[15px] max-w-[46ch]">
          Numerology &amp; Vedic astrology inspired guidance for today, recalculated automatically at
          midnight IST.
        </p>
      </div>
    </header>
  );
}
