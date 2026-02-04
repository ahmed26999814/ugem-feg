"use client";

import { useEffect, useState } from "react";
import { Lock, PlusCircle, Trash2 } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  body: string;
  source?: string;
  created_at?: string;
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ctqqttielcknjpzbynbk.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_a9vgnTKPnx9SK1u8wKHoTw_37glO0q3";

export default function AdminAnnoncesPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [source, setSource] = useState("الإدارة/الاتحاد");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<Notice[]>([]);

  const loadItems = async () => {
    const endpoint = `${SUPABASE_URL}/rest/v1/annonces?select=*&order=created_at.desc.nullslast`;
    const res = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return;
    const data = (await res.json()) as Notice[];
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (authed) loadItems();
  }, [authed]);

  const login = () => {
    if (username.trim().toLowerCase() === "ugem feg" && password.trim() === "44881891") {
      setAuthed(true);
      setMsg("تم تسجيل الدخول.");
    } else {
      setAuthed(false);
      setMsg("بيانات الأدمن غير صحيحة.");
    }
  };

  const createNotice = async () => {
    if (!title.trim() || !body.trim()) {
      setMsg("العنوان والمحتوى مطلوبان.");
      return;
    }

    setLoading(true);
    setMsg(null);

    const res = await fetch("/api/annonces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, title, body, source }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMsg(data?.error || "فشل الإضافة.");
      return;
    }

    setTitle("");
    setBody("");
    setSource("الإدارة/الاتحاد");
    setMsg("تمت إضافة الإعلان.");
    await loadItems();
  };

  const removeNotice = async (id: string) => {
    setLoading(true);
    const res = await fetch("/api/annonces", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, id }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMsg(data?.error || "فشل الحذف.");
      return;
    }

    setMsg("تم حذف الإعلان.");
    await loadItems();
  };

  return (
    <div className="page-shell">
      <div className="container">
        <section className="section-card">
          <h1 className="text-3xl font-black">Admin - الإعلانات</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            هذه الصفحة مخصصة للإدارة فقط عبر المسار /Admin.
          </p>

          {!authed ? (
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="اسم الأدمن"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="كود الأدمن"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                onClick={login}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
              >
                <Lock size={15} />
                دخول
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4 grid gap-2">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان الإعلان"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                />
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="محتوى الإعلان"
                  rows={4}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                />
                <input
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="المصدر"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  onClick={createNotice}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  <PlusCircle size={15} />
                  {loading ? "جارٍ المعالجة..." : "إضافة إعلان"}
                </button>
              </div>

              <div className="mt-6 grid gap-2">
                {items.map((item) => (
                  <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
                      </div>
                      <button
                        onClick={() => removeNotice(item.id)}
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
                        title="حذف"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {msg && <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200">{msg}</p>}
        </section>
      </div>
    </div>
  );
}
