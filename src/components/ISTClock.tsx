import { useEffect, useState } from "react";
import { formatClock, getISTTime } from "../utils/dateUtils";

export default function ISTClock() {
  const [clock, setClock] = useState(() => formatClock(getISTTime()));

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock(getISTTime())), 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono">{clock}</span>;
}
