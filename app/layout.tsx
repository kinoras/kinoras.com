import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono, Noto_Sans_JP } from 'next/font/google'

import Header from '@/components/layout/header'

import { cn } from '@/lib/utils'

import './globals.css'

const latinSans = Geist({
    variable: '--font-latin-sans',
    subsets: ['latin']
})

const latinMono = Geist_Mono({
    variable: '--font-latin-mono',
    subsets: ['latin']
})

const cjkSans = Noto_Sans_JP({
    variable: '--font-cjk-sans',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: {
        template: '%s | kinoRAS',
        default: 'kinoRAS'
    },
    description: 'I am a web developer from Macau.'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="zh-tw" suppressHydrationWarning>
            <body
                className={cn(
                    latinSans.variable,
                    latinMono.variable,
                    cjkSans.variable,
                    'bg-background text-primary font-sans',
                    'antialiased'
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
