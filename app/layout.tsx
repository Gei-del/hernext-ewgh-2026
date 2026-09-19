import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReStart Compass | Your path still counts",
  description: "A focused planning tool for women returning to work, changing careers, or pursuing a first formal role.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
