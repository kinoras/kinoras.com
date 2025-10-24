'use client'

import { memo } from 'react'
import type { ComponentProps } from 'react'

import { useTheme } from 'next-themes'

import { ShikiHighlighter } from 'react-shiki'

import { cn } from '@/lib/utils'

const SyntaxHighlighter = ({
    code,
    language,
    className,
    ...restProps
}: ComponentProps<'code'> & {
    code: string
    language: string
}) => {
    const { resolvedTheme } = useTheme()

    const lineCount = (code.match(/\n/g) || []).length + 1 // Line breaks + 1

    return (
        <ShikiHighlighter
            language={language}
            theme={resolvedTheme === 'light' ? 'github-light-default' : 'github-dark-default'}
            // Options
            showLineNumbers={lineCount >= 10}
            showLanguage={false}
            addDefaultStyles={false}
            // Styling
            className={cn('[&>pre]:bg-transparent!', className)}
            {...restProps}
        >
            {code}
        </ShikiHighlighter>
    )
}

export default memo(SyntaxHighlighter)
