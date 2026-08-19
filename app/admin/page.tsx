import type { Metadata } from "next";
import AdminHome from "@/components/sections/AdminHome";

export const metadata: Metadata = {
  title: "Internal | Supplied",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminHome />;
}
