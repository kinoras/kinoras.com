'use client'

import type { ComponentProps } from 'react'

import 'katex/dist/katex.min.css'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'

import SyntaxHighlighter from '../custom/syntax-highlighter'

const Passage = ({ className, ...props }: ComponentProps<'article'>) => {
    return (
        <section data-slot="passage-wrapper" className="wrapper">
            <article
                data-slot="passage"
                className={cn('container max-w-4xl!', className)}
                {...props}
            />
        </section>
    )
}

const PassageHeader = ({ className, ...props }: ComponentProps<'div'>) => {
    return (
        <div
            data-slot="passage-header"
            className={cn(
                'mb-6 py-6 sm:mb-7 sm:py-7 md:mb-8 md:py-8', // Spacing
                'border-border border-b', // Border
                'flex flex-col gap-3 sm:gap-4', // Layout
                className
            )}
            {...props}
        />
    )
}

const PassageTitle = ({ className, ...props }: ComponentProps<'h1'>) => {
    return (
        <h1
            data-slot="passage-title"
            className={cn(
                'text-3xl leading-[1.3] font-medium tracking-tight sm:text-4xl md:text-[42px]', // Font
                className
            )}
            {...props}
        />
    )
}

const PassageBody = ({ content, ...props }: ComponentProps<'div'>) => {
    return (
        <div className="passage" {...props}>
            <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeUnwrapImages]}
                components={{
                    a: ({ node, ...props }) => (
                        <a target="_blank" rel="noopener noreferrer nofollow" {...props} />
                    ),

                    code: ({ node, children, ...props }) => {
                        const code = String(children).trim()
                        const match = props.className?.match(/language-(\w+)/)
                        const language = match?.[1]

                        return language ? (
                            <SyntaxHighlighter code={code} language={language} {...props} />
                        ) : (
                            <code {...props}>{children}</code> // Plain code if can't determine language
                        )
                    },

                    img: ({ node, alt, ...props }) => (
                        <figure>
                            <img alt={alt} {...props} />
                            {alt && <figcaption>{alt}</figcaption>}
                        </figure>
                    ),

                    table: ({ node, ...props }) => (
                        <div className="table-container">
                            <table {...props} />
                        </div>
                    )
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export { Passage, PassageBody, PassageHeader, PassageTitle }
