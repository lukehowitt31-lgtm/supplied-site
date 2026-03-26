import type { Metadata } from "next";
import KnowledgeAdmin from "@/components/sections/KnowledgeAdmin";

export const metadata: Metadata = {
  title: "Knowledge Admin | Supplied",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <KnowledgeAdmin />;
}
