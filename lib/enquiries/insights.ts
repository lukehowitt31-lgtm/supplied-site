import type { EnquiryInsights, EnquiryRecord } from "./types";

function monthKey(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString("en-GB", { month: "short", year: "numeric" });
}

function topCounts(
  values: string[],
  limit = 8
): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    const label = value.trim() || "Unspecified";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

export function buildEnquiryInsights(rows: EnquiryRecord[]): EnquiryInsights {
  const genuine = rows.filter((row) => row.kind === "genuine");
  const belowMoqRows = genuine.filter((row) => row.belowMoq === true);
  const plugAndPlayRows = genuine.filter((row) => row.plugAndPlayFit);
  const productionRows = genuine.filter(
    (row) => row.volumeBand === "production" && row.belowMoq !== true
  );
  const unknownVolume = genuine.filter(
    (row) => row.volumeBand === "unknown" && row.belowMoq == null
  ).length;

  const monthlyMap = new Map<
    string,
    { month: string; total: number; belowMoq: number; plugAndPlay: number; sort: number }
  >();

  for (const row of genuine) {
    const month = monthKey(row.submittedAt);
    const sort = new Date(row.submittedAt).getTime() || 0;
    const current = monthlyMap.get(month) ?? {
      month,
      total: 0,
      belowMoq: 0,
      plugAndPlay: 0,
      sort,
    };
    current.total += 1;
    if (row.belowMoq) current.belowMoq += 1;
    if (row.plugAndPlayFit) current.plugAndPlay += 1;
    monthlyMap.set(month, current);
  }

  const genuineCount = genuine.length;

  return {
    total: rows.length,
    genuine: genuineCount,
    belowMoq: belowMoqRows.length,
    plugAndPlay: plugAndPlayRows.length,
    productionScale: productionRows.length,
    unknownVolume,
    belowMoqShare: genuineCount ? belowMoqRows.length / genuineCount : 0,
    plugAndPlayShare: genuineCount ? plugAndPlayRows.length / genuineCount : 0,
    productMixBelowMoq: topCounts(
      belowMoqRows.flatMap((row) =>
        row.packagingTypes.length > 0
          ? row.packagingTypes
          : [row.productType || "Unspecified"]
      )
    ),
    quantityBands: topCounts(
      genuine.map((row) => row.estimatedQuantity || row.volumeRaw || "Not stated")
    ),
    monthly: [...monthlyMap.values()]
      .sort((a, b) => a.sort - b.sort)
      .map(({ month, total, belowMoq, plugAndPlay }) => ({
        month,
        total,
        belowMoq,
        plugAndPlay,
      })),
  };
}
