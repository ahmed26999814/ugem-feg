import ResultsLookupClient from "@/components/results/ResultsLookupClient";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResultsPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const qParam = params.q;
  const initialQuery = Array.isArray(qParam) ? qParam[0] ?? "" : qParam ?? "";

  return <ResultsLookupClient initialQuery={initialQuery} />;
}

