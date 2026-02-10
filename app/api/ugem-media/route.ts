import { NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ctqqttielcknjpzbynbk.supabase.co";

const ADMIN_USER = process.env.ANNONCES_ADMIN_USER ?? "ugem feg";
const ADMIN_PASS = process.env.ANNONCES_ADMIN_PASS ?? "44881891";

function isValidAdmin(username: string, password: string) {
  return username.trim().toLowerCase() === ADMIN_USER.toLowerCase() && password.trim() === ADMIN_PASS;
}

function getServiceKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE
  );
}

function buildSupabaseHeaders(key: string, withJson = false) {
  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith("sb_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  if (withJson) headers["Content-Type"] = "application/json";
  return headers;
}

function isMissingColumn(text: string, column: string) {
  return text.includes(column) || text.includes("PGRST204");
}

function parseUrls(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string" && v.trim()) as string[];
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((v) => typeof v === "string" && v.trim()) as string[];
      }
    } catch {
      // keep string fallback
    }
    return [trimmed];
  }
  return [];
}

export async function GET() {
  try {
    const key = getServiceKey();
    if (!key) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_stats?select=ugem_media_images,ugem_media_videos&limit=1`,
      { headers: buildSupabaseHeaders(key), cache: "no-store" }
    );

    if (res.ok) {
      const rows = (await res.json()) as Array<{ ugem_media_images?: string; ugem_media_videos?: string }>;
      const images = parseUrls(rows?.[0]?.ugem_media_images);
      const videos = parseUrls(rows?.[0]?.ugem_media_videos);
      return NextResponse.json({ images, videos });
    }

    const text = await res.text();
    const missingImages = isMissingColumn(text, "ugem_media_images");
    const missingVideos = isMissingColumn(text, "ugem_media_videos");
    if (missingImages || missingVideos) {
      return NextResponse.json({ images: [], videos: [], missingColumn: true });
    }
    return NextResponse.json({ error: text || "فشل تحميل صور وفيديوهات الاتحاد" }, { status: 500 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const data = (await req.json()) as {
      username?: string;
      password?: string;
      images?: string[];
      videos?: string[];
    };
    const username = data.username ?? "";
    const password = data.password ?? "";
    const images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    const videos = Array.isArray(data.videos) ? data.videos.filter(Boolean) : [];

    if (!isValidAdmin(username, password)) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }

    const key = getServiceKey();
    if (!key) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const payload = {
      ugem_media_images: JSON.stringify(images),
      ugem_media_videos: JSON.stringify(videos),
    };

    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?visits=gte.0`, {
      method: "PATCH",
      headers: buildSupabaseHeaders(key, true),
      body: JSON.stringify(payload),
    });

    if (!patchRes.ok) {
      const text = await patchRes.text();
      if (isMissingColumn(text, "ugem_media_images") || isMissingColumn(text, "ugem_media_videos")) {
        return NextResponse.json(
          { error: "أضف عمودين ugem_media_images و ugem_media_videos (text) داخل جدول site_stats." },
          { status: 400 }
        );
      }

      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats`, {
        method: "POST",
        headers: buildSupabaseHeaders(key, true),
        body: JSON.stringify([{ visits: 0, ...payload }]),
      });
      if (!insertRes.ok) {
        const insertText = await insertRes.text();
        return NextResponse.json({ error: insertText || "فشل حفظ الوسائط" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, images, videos });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
