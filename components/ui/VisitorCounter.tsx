"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

type VisitorResponse = { count?: number; show?: boolean; error?: string };

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [show, setShow] = useState(true);

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
        if (typeof data.show === "boolean") {
          setShow(data.show);
        }
      })
      .finally(() => {
        if (!seen) {
          sessionStorage.setItem(key, "1");
        }
      });
  }, []);

  if (!show) return null;

  return (
    <div className="visitor-pill" aria-live="polite">
      <span className="visitor-icon" aria-hidden="true">
        <Users size={14} />
      </span>
      <span className="visitor-label">الزوار</span>
      <span className="visitor-count">{count ?? "—"}</span>
    </div>
  );
}
