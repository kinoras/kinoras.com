import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono, Noto_Sans_JP } from 'next/font/google'

import LoadingProgress from 'nextjs-toploader'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import { cn } from '@/lib/utils'

import './globals.css'

// Fonts
const latinSans = Geist({ variable: '--font-latin-sans', subsets: ['latin'] })
const latinMono = Geist_Mono({ variable: '--font-latin-mono', subsets: ['latin'] })
const cjkSans = Noto_Sans_JP({ variable: '--font-cjk-sans', subsets: ['latin'] })

// Metadata
export const metadata: Metadata = {
    title: { template: '%s | kinoRAS', default: 'kinoRAS' },
    description: 'I am a web developer from Macau.'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    latinSans.variable,
                    latinMono.variable,
                    cjkSans.variable,
                    'bg-background text-primary font-sans',
                    'flex min-h-svh flex-col [&>main]:flex-1',
                    'antialiased'
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LoadingProgress
                        height={2}
                        color="var(--color-theme)"
                        shadow={false}
                        zIndex={20}
                        showSpinner={false}
                    />
                    <Header />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
