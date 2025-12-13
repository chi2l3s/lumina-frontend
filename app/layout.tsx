import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { ApolloClientProvider } from "@/components/providers/apollo-client-provider";
import { EmojiProviders } from "@/components/providers/emoji-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
} from "@/lib/constants/seo";
import { APP_URL } from "@/lib/constants/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  applicationName: SITE_NAME,
  authors: [
    {
      name: "Klix",
      url: new URL("https://github.com/chi2l3s"),
    },
  ],
  keywords: SITE_KEYWORDS,
  generator: "Next.js",
  creator: "Klix",
  publisher: "Clickable Holograms",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/touch-icons/256x256.png",
    other: {
      rel: "touch-icons",
      url: "/touch-icons/256x256.png",
      sizes: "256x256",
      type: "image/png",
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    emails: ["help@klixx.ru"],
    locale: "ru_RU",
    images: [
      {
        url: "/touch-icons/512x512.png",
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
    url: new URL(APP_URL),
  },
  twitter: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/touch-icons/512x512.png",
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloClientProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <EmojiProviders>
              <ToastProvider>
                <NextTopLoader />
                {children}
              </ToastProvider>
            </EmojiProviders>
          </ThemeProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
