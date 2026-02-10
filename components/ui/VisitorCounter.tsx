"use client";

import { useEffect, useState } from "react";

type VisitorResponse = { count?: number; error?: string };

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = "ugem_visit_session";
    const seen = typeof window !== "undefined" && sessionStorage.getItem(key) === "1";
    const method = seen ? "GET" : "POST";

    fetch("/api/visitors", { method })
      .then((res) => res.json() as Promise<VisitorResponse>)
      .then((data) => {
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .finally(() => {
        if (!seen) {
          sessionStorage.setItem(key, "1");
        }
      });
  }, []);

  return (
    <div className="footer-visit" aria-live="polite">
      <span className="footer-visit-label">عدد الزوار</span>
      <span className="footer-visit-count">{count ?? "—"}</span>
    </div>
  );
}
