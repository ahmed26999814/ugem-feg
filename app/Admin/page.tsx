"use client";

import { useEffect, useState } from "react";
import { Lock, PlusCircle, Trash2 } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  body: string;
  link?: string;
  source?: string;
  created_at?: string;
};
type Row = Record<string, unknown>;

function toText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function normalizeRow(row: Row, index: number): Notice {
  const id =
    toText(row.id) ||
    toText(row.Primary) ||
    toText(row.primary) ||
    toText(row.uuid) ||
    toText(row.uid) ||
    `row-${index}`;

  return {
    id,
    title: toText(row.title) || toText(row.titre) || toText(row.name) || "إعلان",
    body: toText(row.body) || toText(row.content) || toText(row.text) || "",
    link: toText(row.link) || toText(row.url) || toText(row.href) || undefined,
    source: toText(row.source) || undefined,
    created_at: toText(row.created_at) || undefined,
  };
}

function isImageUrl(url?: string) {
  if (!url) return false;
  if (url.startsWith("data:image/")) return true;
  return /\.(png|jpe?g|webp|gif|bmp|svg)(\?.*)?$/i.test(url);
}

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
  const [mode, setMode] = useState<"text" | "image">("text");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<Notice[]>([]);
  const [counterValue, setCounterValue] = useState<boolean | null>(null);
  const [counterSaved, setCounterSaved] = useState<boolean | null>(null);
  const [counterLoading, setCounterLoading] = useState(false);
  const [counterSaving, setCounterSaving] = useState(false);
  const [counterHint, setCounterHint] = useState<string | null>(null);

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
    const data = (await res.json()) as Row[];
    setItems((Array.isArray(data) ? data : []).map(normalizeRow));
  };

  useEffect(() => {
    if (authed) {
      loadItems();
      fetch("/api/visitors")
        .then((res) => res.json() as Promise<{ show?: boolean }>)
        .then((data) => {
          if (typeof data.show === "boolean") {
            setCounterValue(data.show);
            setCounterSaved(data.show);
          }
          if ((data as { missingShowColumn?: boolean }).missingShowColumn) {
            setCounterHint("أضف عمود show_counter (boolean) داخل جدول site_stats لتفعيل الإظهار/الإخفاء.");
          } else {
            setCounterHint(null);
          }
        })
        .catch(() => {
          setCounterValue(true);
          setCounterSaved(true);
        });
    }
  }, [authed]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

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
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedImage = imageUrl.trim();

    if (!trimmedTitle) {
      setMsg("العنوان مطلوب.");
      return;
    }
    if (mode === "text" && !trimmedBody) {
      setMsg("المحتوى مطلوب للإعلان النصي.");
      return;
    }
    if (mode === "image" && !imageFile && !trimmedImage) {
      setMsg("اختر صورة للرفع أو ضع رابطها.");
      return;
    }

    setLoading(true);
    setMsg(null);

    let finalImage = "";
    if (mode === "image") {
      if (imageFile) {
        const form = new FormData();
        form.append("username", username);
        form.append("password", password);
        form.append("file", imageFile);
        const uploadRes = await fetch("/api/annonces-upload", {
          method: "POST",
          body: form,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          setLoading(false);
          setMsg(uploadData?.error || "فشل رفع الصورة.");
          return;
        }
        finalImage = uploadData?.url || "";
      } else {
        finalImage = trimmedImage;
      }
    }

    const res = await fetch("/api/annonces-v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        title: trimmedTitle,
        body: trimmedBody,
        source,
        imageUrl: finalImage,
      }),
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
    setImageUrl("");
    setImageFile(null);
    setMsg("تمت إضافة الإعلان.");
    await loadItems();
  };

  const removeNotice = async (id: string) => {
    setLoading(true);
    const res = await fetch("/api/annonces-v2", {
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

  const saveCounter = async () => {
    if (counterValue === null) return;
    setCounterSaving(true);
    const res = await fetch("/api/visitors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, show: counterValue }),
    });
    const data = await res.json();
    setCounterSaving(false);
    if (!res.ok) {
      setMsg(data?.error || "فشل تحديث عداد الزوار.");
      return;
    }
    setCounterSaved(Boolean(data?.show));
    setCounterValue(Boolean(data?.show));
    setMsg(Boolean(data?.show) ? "تم إظهار عداد الزوار." : "تم إخفاء عداد الزوار.");
  };

  return (
    <div className="page-shell">
      <div className="container">
        {authed ? (
          <section className="section-card">
            <h2 className="text-xl font-black">عداد الزوار</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              تحكم بإظهار أو إخفاء عداد الزوار في الموقع.
            </p>
            {counterHint ? (
              <p className="mt-2 text-xs font-bold text-amber-600 dark:text-amber-300">{counterHint}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setCounterValue(true)}
                className={`rounded-full px-4 py-2 text-xs font-black transition ${
                  counterValue
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                إظهار
              </button>
              <button
                type="button"
                onClick={() => setCounterValue(false)}
                className={`rounded-full px-4 py-2 text-xs font-black transition ${
                  counterValue === false
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                إخفاء
              </button>
              <button
                type="button"
                onClick={saveCounter}
                disabled={counterSaving || counterValue === counterSaved || counterValue === null}
                className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-black text-slate-900 hover:bg-yellow-400 disabled:opacity-60"
              >
                {counterSaving ? "جارٍ الحفظ..." : "حفظ التغيير"}
              </button>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                الحالة: {counterValue ? "ظاهر" : "مخفي"}
              </span>
            </div>
          </section>
        ) : null}

        <section className="section-card mt-4">
          <h1 className="text-3xl font-black">Admin - الإعلانات</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            هذه الصفحة مخصصة للإدارة فقط عبر المسار /Admin (أو /admin).
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
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("text");
                      setImageUrl("");
                      setImageFile(null);
                    }}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                      mode === "text"
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    إعلان نصي
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("image")}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                      mode === "image"
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    إعلان بصورة
                  </button>
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان الإعلان"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                />
                {mode === "image" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setImageFile(file);
                      }}
                      className="rounded-xl border border-dashed border-emerald-300 bg-white px-3 py-2 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white dark:border-emerald-500/40 dark:bg-slate-800"
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="معاينة"
                        className="w-full rounded-xl border border-slate-200 object-contain dark:border-slate-700"
                      />
                    ) : null}
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="أو ضع رابط الصورة (اختياري)"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                    />
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="وصف مختصر (اختياري)"
                      rows={3}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                    />
                  </>
                ) : (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="محتوى الإعلان"
                    rows={4}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                )}
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
                        {isImageUrl(item.link) ? (
                          <img
                            src={item.link}
                            alt={item.title}
                            className="mt-2 w-full max-w-sm rounded-lg border border-slate-200 object-contain shadow-sm dark:border-slate-700"
                          />
                        ) : null}
                        {item.body ? (
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
                        ) : null}
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
