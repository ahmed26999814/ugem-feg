export default function Home() {
  const reviewLinks = [
    { label: "L1 economie Gestion", href: "https://t.me/+0SIEJekiSk4wMzM0" },
    { label: "L1 GRH", href: "https://t.me/+Lb-WR7hEKh44ODU0" },
    { label: "L1 FC", href: "https://t.me/+DvOr7i8iENs2NTY0" },
    { label: "L1 BA", href: "https://t.me/+IoS7OowcqUA2NDc0" },
    { label: "L2 economie Gestion", href: "https://t.me/+_m6KND3N-Io1YzE0" },
    { label: "L2 GRH", href: "https://t.me/+eKmZrlazQy5lZGY0" },
    { label: "L2 FC", href: "https://t.me/+kO_ZG4Oi85czOGI0" },
    { label: "L2 BA", href: "https://t.me/+ErR7e63WwtY5ZThk" },
    { label: "L3 FC BA GRH", href: "https://t.me/+jipuPnq_EaNlNmNk" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-6 py-16">
        <section
          dir="rtl"
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
        >
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            ملخصات و مراجعات
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            نعمل على توفير المراجعات في أقرب وقت شكرا على تفهمكم
          </p>
          <ul className="mt-6 space-y-3">
            {reviewLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition hover:border-slate-300 hover:bg-white"
                >
                  <span dir="ltr" className="font-medium">
                    {item.label}
                  </span>
                  <span className="text-sm text-slate-500">Telegram</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
