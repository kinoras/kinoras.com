import type { ComponentProps } from 'react'

import Markdown from 'react-markdown'

import { cn } from '@/lib/utils'

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
                components={{
                    a: ({ node, ...props }) => (
                        <a target="_blank" rel="noopener noreferrer nofollow" {...props} />
                    ),
                    code: ({ node, className, ...props }) => (
                        <code className={cn('code-inline font-mono', className)} {...props} />
                    )
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export { Passage, PassageBody, PassageHeader, PassageTitle }
