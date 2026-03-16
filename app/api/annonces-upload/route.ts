import { handleUpload } from "@/lib/upload-util";

export async function POST(req: Request) {
  return handleUpload(req, (safeName) => `annonces/${Date.now()}-${safeName}`);
}
