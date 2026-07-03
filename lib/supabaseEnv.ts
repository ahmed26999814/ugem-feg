export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const trimmed = url.trim().replace(/\/+$/, "");

  if (!trimmed) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing. Add it in Vercel Environment Variables.");
  }

  return trimmed;
}
