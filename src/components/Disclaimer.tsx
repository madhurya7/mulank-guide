export function DisclaimerBanner() {
  return (
    <div
      role="note"
      className="max-w-[1080px] mx-auto mt-5 px-4.5 py-3 border border-marigoldSoft rounded-xl text-[13.5px] flex gap-2.5 items-start"
      style={{ background: "linear-gradient(180deg,#FFF9EE,#FCF2DC)", color: "#6B4A16" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none">
        <path
          d="M12 9v4M12 16.5h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.71 3.86a2 2 0 0 0-3.42 0Z"
          stroke="#B0791C"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        <strong style={{ color: "#523306" }}>Important:</strong> Astrology and numerology are
        traditional belief systems. Treat everything below as guidance and reflection, not certainty —
        not for medical, financial or legal decisions.
      </span>
    </div>
  );
}

export function DisclaimerFooter() {
  return (
    <footer className="max-w-[1080px] mx-auto mt-14 px-5 pt-5 pb-10 border-t border-black/10 text-[12.5px] text-inkFaint leading-relaxed">
      <p className="mb-2">
        <strong className="text-inkSoft">About this app.</strong> Daily Mulank Guide combines the
        traditional numerology Driver Number (Mulank) system with Vedic astrology inspired Muhurat
        timings, calculated fresh each day for Indian Standard Time.
      </p>
      <p className="mb-2">
        <strong className="text-inkSoft">Important:</strong> Astrology and numerology are traditional
        belief systems, not scientifically proven predictive tools. Nothing on this page should be used
        for medical, financial, legal or other high-stakes decisions. Muhurat timings are approximate,
        derived from standard sunrise/sunset equations for the selected city, and may vary slightly from
        local panchang sources.
      </p>
      <p className="m-0">
        Mulank (Driver Number) is derived only from the day of birth, reduced to a single digit —
        distinct from Bhagyank (Life Path Number), which uses the full date of birth.
      </p>
    </footer>
  );
}
