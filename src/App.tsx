import { useEffect, useState } from "react";
import Header from "./components/Header";
import { DisclaimerBanner, DisclaimerFooter } from "./components/Disclaimer";
import MuhuratCard from "./components/MuhuratCard";
import MulankLookup from "./components/MulankLookup";
import MulankGrid from "./components/MulankGrid";
import { getISTDate, ISTDate } from "./utils/dateUtils";

export default function App() {
  const [istDate, setIstDate] = useState<ISTDate | null>(null);
  const [highlightedMulank, setHighlightedMulank] = useState<number | null>(null);
  const [offline, setOffline] = useState(false);

  // Initial load (tiny artificial delay so the header's skeleton state is visible briefly)
  useEffect(() => {
    const t = setTimeout(() => setIstDate(getISTDate()), 120);
    return () => clearTimeout(t);
  }, []);

  // Watch for IST calendar-date rollover; only regenerate when the date actually changes.
  useEffect(() => {
    if (!istDate) return;
    const id = setInterval(() => {
      const fresh = getISTDate();
      if (fresh.dateKey !== istDate.dateKey) {
        setIstDate(fresh);
        setHighlightedMulank(null);
      }
    }, 20000);
    return () => clearInterval(id);
  }, [istDate]);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    setOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  useEffect(() => {
    if (highlightedMulank === null) return;
    const card = document.getElementById(`mulank-${highlightedMulank}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      (card as HTMLElement).focus({ preventScroll: true });
    }
  }, [highlightedMulank]);

  return (
    <div className="min-h-screen text-ink font-body">
      <Header istDate={istDate} />
      <DisclaimerBanner />

      <main className="max-w-[1080px] mx-auto px-5 pt-7">
        {offline && (
          <div className="text-[12.5px] text-[#8A2020] bg-[#FDECEC] border border-[#F2C8C8] rounded-lg px-3 py-2 mb-3.5">
            You're currently offline. Showing the most recently generated report.
          </div>
        )}

        <MuhuratCard />

        {istDate && (
          <MulankLookup currentYear={istDate.year} onFound={(m) => setHighlightedMulank(m)} />
        )}

        {istDate ? (
          <MulankGrid istDate={istDate} highlightedMulank={highlightedMulank} />
        ) : (
          <section className="mt-11">
            <div className="skel h-6 w-40 mb-4">Loading</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="skel h-48 rounded-xl2" />
              ))}
            </div>
          </section>
        )}
      </main>

      <DisclaimerFooter />
    </div>
  );
}
