import type { Metadata } from "next";
import "../styles/global.scss";
import { firacode, inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Bar from "@/components/bar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Hacker Blog",
  description: "A text only blog/thread",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://hn.algolia.com" />
      </head>
      <body
        className={cn(
          inter.variable,
          firacode.variable,
          "font-inter no-scrollbar",
          "bg-vista-white dark:bg-gunmetal"
        )}
      >
        <Suspense>
          <Bar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
