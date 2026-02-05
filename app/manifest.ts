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
        src: "/feg-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/feg-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/feg-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

