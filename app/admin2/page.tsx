"use client";

import { useState } from "react";
import { SITE_ACCESS_CODE } from "@/lib/siteState";

export default function Admin2Page() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (trimmed !== SITE_ACCESS_CODE) {
      setError("الكود غير صحيح.");
      return;
    }

    const res = await fetch("/api/admin2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: trimmed }),
    }).catch(() => null);

    if (!res || !res.ok) {
      setError("الكود غير صحيح.");
      return;
    }

    setError("");
    window.location.href = "/";
  };

  return (
    <section className="admin2-shell">
      <form className="admin2-card" onSubmit={onSubmit}>
        <div className="admin2-logo-wrap">
          <img src="/ugem-logo.jpg" alt="شعار الاتحاد" className="admin2-logo" />
        </div>
        <div className="admin2-badge">Admin2</div>
        <h1 className="admin2-title">الدخول إلى محتوى الموقع</h1>
        <p className="admin2-desc">أدخل الكود للوصول إلى كل أقسام الموقع.</p>

        <label className="admin2-label" htmlFor="admin2-code">
          الكود
        </label>
        <input
          id="admin2-code"
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          className="admin2-input"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="••••••••"
        />

        {error ? <p className="admin2-error" role="alert">{error}</p> : null}

        <button type="submit" className="admin2-btn" disabled={!code.trim()}>
          دخول
        </button>
      </form>
    </section>
  );
}
