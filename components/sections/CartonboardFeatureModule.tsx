import { ProductSpec } from "@/types";

type FeatureInfo = {
  title: string;
  subtitle: string;
  icon: string;
};

type MaterialInfo = {
  title: string;
  boardCode: string;
  subtitle: string;
  image: string;
};

type FinishInfo = {
  title: string;
  image: string;
  subtitle: string;
};

type LeadTimeRow = {
  region: string;
  method: string;
  minWeeks: number;
  maxWeeks: number;
};

interface CartonboardFeatureModuleProps {
  detailedSpecs: ProductSpec[];
}

const featureInfo: FeatureInfo[] = [
  {
    title: "Peel & Seal",
    subtitle: "Secure closure without additional tape.",
    icon: "/images/product-info/Adhesive-Icon.svg",
  },
  {
    title: "Tear Strip",
    subtitle: "Clean opening for faster customer access.",
    icon: "/images/product-info/Tear-Strip_1.svg",
  },
  {
    title: "Crashlock Base",
    subtitle: "Quick assembly to speed up packing lines.",
    icon: "/images/product-info/Crashlock.svg",
  },
];

const materialInfo: MaterialInfo[] = [
  {
    title: "White Board (Both Sides)",
    boardCode: "GC1 / GC2",
    subtitle: "Bright white inside and out for premium shelf presentation.",
    image: "/images/product-info/WhiteBothSidesCartonboard.png",
  },
  {
    title: "White Board (One Side)",
    boardCode: "GT2",
    subtitle: "White exterior with natural reverse for balanced cost and finish.",
    image: "/images/product-info/WhiteOneSideCartonboard.png",
  },
  {
    title: "Brown Kraft",
    boardCode: "Kraft",
    subtitle: "Natural uncoated board for tactile, sustainability-led packs.",
    image: "/images/product-info/KraftBothSidesCartonboard.png",
  },
];

const finishInfo: FinishInfo[] = [
  {
    title: "Spot Gloss",
    image: "/images/product-info/SuppliedSpotGloss.jpg",
    subtitle: "Selective shine to emphasise logos and key elements.",
  },
  {
    title: "Foiling",
    image: "/images/product-info/SuppliedFoiling.jpg",
    subtitle: "Metallic accents for premium retail impact.",
  },
  {
    title: "Emboss / Deboss",
    image: "/images/product-info/SuppliedEmbossed.jpg",
    subtitle: "Tactile depth for elevated brand perception.",
  },
];

const leadTimes: LeadTimeRow[] = [
  { region: "United Kingdom", method: "Ground", minWeeks: 4, maxWeeks: 4 },
  { region: "Europe", method: "Ground", minWeeks: 4, maxWeeks: 5 },
  { region: "China", method: "Air", minWeeks: 6, maxWeeks: 8 },
  { region: "China", method: "Sea", minWeeks: 12, maxWeeks: 14 },
];

const MAX_LEAD_TIME = 14;

function getOtherSpecRows(specs: ProductSpec[]): ProductSpec[] {
  const excludedLabels = ["material", "board", "feature", "finish", "lead time"];

  const filtered = specs.filter((spec) => {
    const normalized = spec.label.toLowerCase();
    return !excludedLabels.some((label) => normalized.includes(label));
  });

  return filtered;
}

export function CartonboardFeatureModule({
  detailedSpecs,
}: CartonboardFeatureModuleProps) {
  const otherSpecRows = getOtherSpecRows(detailedSpecs);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-supplied-ink-10 bg-white p-4 md:p-5">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="rounded-xl border border-supplied-ink-10 bg-supplied-bg p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-supplied-amber mb-1">
              01 · Unique Features
            </p>
            <h2 className="text-[20px] font-extrabold text-supplied-ink leading-[1.1] tracking-[-0.02em] mb-3">
              Unique Features
            </h2>

            <div className="space-y-2">
              {featureInfo.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-supplied-ink-10 overflow-hidden bg-white grid grid-cols-[122px_1fr] min-h-[126px]"
                >
                  <div className="border-r border-supplied-ink-10 bg-[#FBFAF7] p-2">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain aspect-square"
                    />
                  </div>
                  <div className="p-2.5">
                    <h3 className="text-[12px] font-semibold text-supplied-ink mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] leading-[1.45] text-supplied-ink-40">
                      {item.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-supplied-ink-10 bg-supplied-bg p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-supplied-amber mb-1">
              02 · Board Options
            </p>
            <h2 className="text-[20px] font-extrabold text-supplied-ink leading-[1.1] tracking-[-0.02em] mb-3">
              Board Options
            </h2>

            <div className="space-y-2">
              {materialInfo.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-supplied-ink-10 overflow-hidden bg-white grid grid-cols-[122px_1fr] min-h-[126px]"
                >
                  <div className="border-r border-supplied-ink-10 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[9px] uppercase tracking-[0.1em] font-semibold text-supplied-amber mb-0.5">
                      {item.boardCode}
                    </p>
                    <h3 className="text-[12px] font-semibold text-supplied-ink mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] leading-[1.45] text-supplied-ink-40">
                      {item.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-supplied-ink-10 bg-supplied-bg p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-supplied-amber mb-1">
              03 · Finishes
            </p>
            <h2 className="text-[20px] font-extrabold text-supplied-ink leading-[1.1] tracking-[-0.02em] mb-3">
              Finishes
            </h2>

            <div className="space-y-2">
              {finishInfo.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-supplied-ink-10 overflow-hidden bg-white grid grid-cols-[122px_1fr] min-h-[126px]"
                >
                  <div className="border-r border-supplied-ink-10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[9px] uppercase tracking-[0.1em] font-semibold text-supplied-amber mb-0.5 invisible">
                      Finish Type
                    </p>
                    <h3 className="text-[12px] font-semibold text-supplied-ink mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] leading-[1.45] text-supplied-ink-40">
                      {item.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-supplied-ink-10 bg-white p-4 md:p-5">
        <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-supplied-amber mb-1.5">
          04 · Other Details & Lead Times
        </p>
        <h2 className="text-[clamp(20px,2.8vw,28px)] font-extrabold text-supplied-ink leading-[1.15] tracking-[-0.02em] mb-4">
          Other Production Details
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-4">
          <div className="rounded-lg border border-supplied-ink-10 bg-supplied-bg p-3">
            <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-supplied-amber mb-2">
              Specs from Technical Card
            </p>
            <div className="rounded-md border border-supplied-ink-10 bg-white px-3">
              {otherSpecRows.map((spec, idx) => (
                <div
                  key={spec.label}
                  className={`flex justify-between items-start gap-3 py-2.5 ${
                    idx === otherSpecRows.length - 1
                      ? ""
                      : "border-b border-supplied-ink-10"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.08em] text-supplied-ink-40">
                    {spec.label}
                  </span>
                  <span className="text-[11px] font-medium text-supplied-ink text-right max-w-[65%] leading-[1.35]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-supplied-ink-10 bg-supplied-bg p-3">
            <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-supplied-amber mb-2">
              Indicative Lead Times
            </p>
            <div className="space-y-2">
              {leadTimes.map((row) => (
                <div
                  key={`${row.region}-${row.method}`}
                  className="rounded-md border border-supplied-ink-10 bg-white p-2.5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-[11px] font-semibold text-supplied-ink">
                      {row.region}
                    </p>
                    <p className="text-[10px] text-supplied-ink-40">
                      {row.minWeeks === row.maxWeeks
                        ? `${row.maxWeeks} weeks`
                        : `${row.minWeeks}-${row.maxWeeks} weeks`}
                    </p>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.08em] text-supplied-ink-40 mb-1.5">
                    {row.method} freight
                  </p>
                  <div className="h-[5px] rounded-full bg-black/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C8773E] to-[#E1A068]"
                      style={{
                        width: `${(row.maxWeeks / MAX_LEAD_TIME) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
