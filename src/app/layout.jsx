import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import { extractRouterConfig } from "uploadthing/server";


import ReactQueryProvider from "@/app/ReactQueryProvider";

import { Toaster } from "@/components/ui/toaster";
import { fileRouter } from "@/app/api/uploadthing/core";

import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans"
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono"
});

export const metadata = {
    title: {
        template: "%s | bugbook",
        default: "bugbook"
    },
    description: "The social media app for powernerds"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
                <ReactQueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </ReactQueryProvider>
                <Toaster />
            </body>
        </html>
    );
}
