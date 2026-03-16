const readEnv = (name: string, fallback = ""): string => {
  return process.env[name] ?? fallback;
};

export const sanityProjectId = readEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
export const sanityDataset = readEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
export const sanityApiVersion = readEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2026-03-13");
export const sanityReadToken = readEnv("SANITY_API_READ_TOKEN");
export const sanityWriteToken = readEnv("SANITY_API_WRITE_TOKEN");
export const sanityRevalidateSecret = readEnv("SANITY_REVALIDATE_SECRET");

export function assertSanityProjectConfig(): void {
  if (!sanityProjectId || sanityProjectId.startsWith("YOUR_")) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local."
    );
  }
}
