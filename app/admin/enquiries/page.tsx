import type { Metadata } from "next";
import EnquiriesAdmin from "@/components/sections/EnquiriesAdmin";

export const metadata: Metadata = {
  title: "Enquiry insights | Supplied",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EnquiriesAdmin />;
}
