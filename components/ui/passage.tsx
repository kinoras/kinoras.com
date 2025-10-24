import type { ComponentProps } from 'react'

import 'katex/dist/katex.min.css'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import {
    Anchor,
    BlockCode,
    Blockquote,
    Figure,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    HorizontalRule,
    InlineCode,
    OrderedList,
    Paragraph,
    Strong,
    Table,
    UnorderedList
} from '@/components/ui/typography'

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
    return <Heading1 data-slot="passage-title" className={cn('my-0', className)} {...props} />
}

const PassageBody = ({ content, ...props }: ComponentProps<'div'>) => {
    return (
        <div className="overflow-x-hidden" {...props}>
            <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeUnwrapImages]}
                components={{
                    h1: ({ node, ...props }) => <Heading2 {...props} />,
                    h2: ({ node, ...props }) => <Heading3 {...props} />,
                    h3: ({ node, ...props }) => <Heading4 {...props} />,

                    p: ({ node, ...props }) => <Paragraph {...props} />,
                    a: ({ node, ...props }) => <Anchor {...props} />,
                    strong: ({ node, ...props }) => <Strong {...props} />,
                    blockquote: ({ node, ...props }) => <Blockquote {...props} />,

                    ul: ({ node, ...props }) => <UnorderedList {...props} />,
                    ol: ({ node, ...props }) => <OrderedList {...props} />,

                    code: ({ node, children, ...props }) => {
                        const code = String(children).trim()
                        const match = props.className?.match(/language-(\w+)/)
                        const language = match?.[1]

                        return language ? (
                            <BlockCode code={code} language={language} {...props} />
                        ) : (
                            <InlineCode {...props}>{children}</InlineCode>
                        )
                    },

                    img: ({ node, alt, ...props }) => (
                        <Figure>
                            <img alt={alt} {...props} />
                            <figcaption>{alt}</figcaption>
                        </Figure>
                    ),
                    
                    table: ({ node, ...props }) => <Table {...props} />,

                    hr: ({ node, ...props }) => <HorizontalRule {...props} />
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export { Passage, PassageBody, PassageHeader, PassageTitle }
