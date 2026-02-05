import type { Metadata } from "next";

/* ===============================
   إعدادات الموقع العامة
   =============================== */

export const SITE = {
  name: "UGEM - FEG",
  shortName: "UGEM-FEG",
  url: "https://ugem-feg.vercel.app", // عدّلها بعد النشر إن تغير الدومين

  descriptionAR:
    "منصة طلاب كلية الاقتصاد والتسيير بجامعة نواكشوط العصرية. توفر الجداول، الأرشيف، مواد الدراسة PDF، مجموعات واتساب، ومعلومات قسم الاتحاد العام للطلاب الموريتانيين.",

  descriptionFR:
    "Plateforme des étudiants de la Faculté d’Économie et de Gestion (Université de Nouakchott). Emplois du temps, archives PDF, supports de cours, groupes WhatsApp et section UGEM.",

  localeAR: "ar_MR",
  localeFR: "fr_FR",

  keywords: [
    "UGEM",
    "UGEM FEG",
    "Faculté Économie Gestion",
    "Université de Nouakchott",
    "Étudiants Mauritanie",
    "FEG Nouakchott",
    "Archives PDF FEG",
    "Emploi du temps FEG",
    "Union Générale des Étudiants Mauritaniens",
  ],
};

/* ===============================
   دالة بناء Metadata
   =============================== */

export function buildMetadata(
  title: string,
  description?: string
): Metadata {
  const desc = description ?? SITE.descriptionAR;

  return {
    title,
    description: desc,

    applicationName: SITE.name,
    generator: "Next.js",
    keywords: SITE.keywords,
    authors: [{ name: "UGEM - FEG" }],

    metadataBase: new URL(SITE.url),

    alternates: {
      canonical: SITE.url,
    },

    openGraph: {
      type: "website",
      title,
      description: desc,
      url: SITE.url,
      siteName: SITE.name,
      locale: SITE.localeAR,
      images: [
        {
          url: "/og.png",        // ضع الصورة في public/og.png
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: ["/og.png"],
    },

    icons: {
      icon: "/ugem-logo.jpg",     // public/ugem-logo.jpg
      apple: "/ugem-logo.jpg",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
