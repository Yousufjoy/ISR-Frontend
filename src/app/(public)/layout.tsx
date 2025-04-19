import type { Metadata } from "next";
import Navbar from "../components/Shared/Navbar";

export const metadata: Metadata = {
  title: "ISR",
  description: "ISR",
};

export default function publicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
