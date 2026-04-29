import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Farhan in Cyber",
    template: "%s | Farhan in Cyber"
  },
  description: "Portfolio of Farhan Ansari - Senior Associate in Automations & Cybersecurity. Specialising in AI Automations, CRM Workflows, Penetration Testing, and Cloud Security.",
  keywords: ["AI Automations", "CRM Automations", "Zapier", "n8n", "Make.com", "Cyber Security", "Penetration Testing", "Farhan Ansari", "Recruit CRM"],
  authors: [{ name: "Farhan Ansari" }],
  creator: "Farhan Ansari",
  openGraph: {
    title: "Farhan in Cyber",
    description: "Portfolio of Farhan Ansari - Senior Associate in Automations & Cybersecurity. Specialising in AI Automations, CRM Workflows, Penetration Testing, and Cloud Security.",
    url: "/",
    siteName: "Farhan in Cyber",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Farhan Ansari - Cyber Security Professional",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan in Cyber",
    description: "Portfolio of Farhan Ansari - Senior Associate in Automations & Cybersecurity",
    images: ["/og-image.png"],
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
    jobTitle: "Senior Associate – Automations",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    sameAs: [
      "https://github.com/fxrhan",
      "https://x.com/fxrhanansari",
      "https://fxrhanansari.medium.com",
      "https://linkedin.com/in/ansari-farhan",
    ],
    description: "Senior Associate in Automations specialising in AI Automations, CRM Workflows, Workflow Automation, and Cybersecurity.",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/og-image.png`,
    knowsAbout: ["AI Automations", "CRM Automations", "Zapier", "n8n", "Make.com", "Penetration Testing", "Cloud Security", "Splunk", "Azure", "AWS"],
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Microsoft Clarity Analytics */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", ${JSON.stringify(process.env.NEXT_PUBLIC_CLARITY_ID)});
              `,
            }}
          />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
