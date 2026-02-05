import type { MetadataRoute } from "next";
import { SITE } from "./metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.descriptionAR,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b1220",
    theme_color: "#0f172a",
    lang: "ar",
    icons: [
      {
        src: "/ugem-logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/ugem-logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: "/ugem-logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}
