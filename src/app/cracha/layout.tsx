import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crachá",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
