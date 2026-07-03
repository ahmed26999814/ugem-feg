const env = process.env as Record<string, string | undefined>;

function firstEnv(names: string[]) {
  for (const name of names) {
    const value = env[name]?.trim();
    if (value) return value;
  }
  return "";
}

export function getOptionalSupabaseUrl() {
  return firstEnv([
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_URL",
    "next_public_supabase_url",
    "supabase_url",
  ]).replace(/\/+$/, "");
}

export function getSupabaseUrl() {
  const url = getOptionalSupabaseUrl();

  if (!url) {
    throw new Error(
      "Supabase URL is missing. Add NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL in Vercel Environment Variables."
    );
  }

  return url;
}

export function getSupabaseAnonKey() {
  return firstEnv([
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_ANON_KEY",
    "next_public_supabase_anon_key",
    "supabase_anon_key",
  ]);
}

export function getSupabaseServiceKey() {
  return firstEnv([
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SERVICE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_ROLE",
    "supabase_service_role_key",
  ]);
}
