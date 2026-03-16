import { handleUpload } from "@/lib/upload-util";

export async function POST(req: Request) {
  return handleUpload(req, (safeName) => `site/home-${Date.now()}-${safeName}`);
}
