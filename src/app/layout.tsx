import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Farhan in Cyber",
    template: "%s | Farhan in Cyber"
  },
  description: "Portfolio of Farhan Ansari - Cyber Security Analyst. Specializing in Penetration Testing, Cloud Security, and Security Operations.",
  keywords: ["Cyber Security", "Penetration Testing", "Cloud Security", "Security Operations", "Farhan Ansari", "InfoSec", "Ethical Hacking"],
  authors: [{ name: "Farhan Ansari" }],
  creator: "Farhan Ansari",
  openGraph: {
    title: "Farhan in Cyber",
    description: "Portfolio of Farhan Ansari - Cyber Security Analyst. Specializing in Penetration Testing, Cloud Security, and Security Operations.",
    url: "/",
    siteName: "Farhan in Cyber",
    images: [
      {
        url: "/hero_bg.png",
        width: 1200,
        height: 630,
        alt: "Farhan in Cyber - Cyber Security Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan in Cyber",
    description: "Portfolio of Farhan Ansari - Cyber Security Analyst",
    images: ["/hero_bg.png"],
    creator: "@fxrhanansari",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Farhan Ansari",
    jobTitle: "Cyber Security Analyst",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    sameAs: [
      "https://github.com/fxrhan",
      "https://x.com/fxrhanansari",
      "https://fxrhanansari.medium.com",
      "https://linkedin.com/in/ansari-farhan",
    ],
    description: "Cyber Security Analyst specializing in Penetration Testing, Cloud Security, and Security Operations.",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/hero_bg.png`,
    knowsAbout: ["Penetration Testing", "Cloud Security", "Security Operations", "Splunk", "Azure", "AWS"],
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
