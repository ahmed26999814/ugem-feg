"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_ACCESS_CODE, SITE_ACCESS_COOKIE } from "@/lib/siteState";

export default function Admin2Page() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (trimmed !== SITE_ACCESS_CODE) {
      setError("الكود غير صحيح.");
      return;
    }

    const maxAge = 60 * 60 * 24 * 7;
    document.cookie = `${SITE_ACCESS_COOKIE}=${SITE_ACCESS_CODE}; path=/; max-age=${maxAge}; samesite=lax`;
    setError("");
    router.push("/");
    router.refresh();
  };

  return (
    <section className="admin2-shell">
      <form className="admin2-card" onSubmit={onSubmit}>
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
