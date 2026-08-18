import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://이사가요.com";
const OG_DESCRIPTION =
  "외국인 없는 한국인 직영팀이 안전하고 신속하게 진행하는 이사 전문업체, 이사가요. 지금 무료 견적 받아보세요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "이사가요 | 이사 전문업체",
    template: "%s | 이사가요",
  },
  description: OG_DESCRIPTION,
  openGraph: {
    title: "이사가요 | 이사 전문업체",
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "이사가요",
    images: [{ url: "/images/og-image.png", width: 1200, height: 900 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "이사가요 | 이사 전문업체",
    description: OG_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
