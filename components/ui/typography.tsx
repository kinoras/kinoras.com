import type { ComponentProps } from 'react'

import SyntaxHighlighter from '@/components/custom/syntax-highlighter'

import { cn } from '@/lib/utils'

/* Headings */

const Heading1 = ({ className, ...props }: ComponentProps<'h1'>) => {
    return (
        <h1
            className={cn(
                'proportional mt-12 mb-5 text-3xl leading-[1.3] font-medium tracking-tight sm:text-4xl md:text-[42px]',
                className
            )}
            {...props}
        />
    )
}

const Heading2 = ({ className, ...props }: ComponentProps<'h2'>) => {
    return (
        <h2
            className={cn(
                'proportional mt-10 mb-4 text-2xl font-semibold first:mt-3 sm:text-3xl',
                className
            )}
            {...props}
        />
    )
}

const Heading3 = ({ className, ...props }: ComponentProps<'h3'>) => {
    return (
        <h3
            className={cn(
                'proportional mt-8 mb-3.5 text-xl font-semibold first:mt-2 sm:text-2xl',
                className
            )}
            {...props}
        />
    )
}

const Heading4 = ({ className, ...props }: ComponentProps<'h4'>) => {
    return (
        <h4
            className={cn(
                'proportional mt-6 mb-3 text-lg font-semibold first:mt-1 sm:text-xl',
                className
            )}
            {...props}
        />
    )
}

/* Text */

const Paragraph = ({ className, ...props }: ComponentProps<'p'>) => {
    return <p className={cn('text-primary/95 mb-5 leading-relaxed', className)} {...props} />
}

const Anchor = ({
    styled = true,
    className,
    ...props
}: ComponentProps<'a'> & {
    /** Whether to apply preset styles. */
    styled?: boolean
}) => {
    return (
        <a
            className={cn(
                styled && [
                    'text-theme font-medium transition-all',
                    'hover:brightness-95 dark:hover:brightness-105', // Highlight on hover
                    'decoration-theme underline-offset-3 hover:underline' // Underline on hover
                ],
                className
            )}
            target="_blank"
            rel="noopener noreferrer nofollow"
            {...props}
        />
    )
}

const Strong = ({ className, ...props }: ComponentProps<'strong'>) => {
    return <strong className={cn('text-primary font-semibold', className)} {...props} />
}

const Blockquote = ({ className, ...props }: ComponentProps<'blockquote'>) => {
    return (
        <blockquote
            className={cn('border-border mt-6 border-l-2 pl-4 italic', className)}
            {...props}
        />
    )
}

/* List */

const UnorderedList = ({ className, ...props }: ComponentProps<'ul'>) => {
    return (
        <ul
            className={cn(
                'my-4 list-disc pl-6',
                '[&_li]:mt-2 [&_li]:leading-relaxed', // List items
                className
            )}
            {...props}
        />
    )
}

const OrderedList = ({ className, ...props }: ComponentProps<'ol'>) => {
    return (
        <ol
            className={cn(
                'my-4 list-decimal pl-6',
                '[&_li]:mt-2 [&_li]:leading-relaxed', // List items
                className
            )}
            {...props}
        />
    )
}

/* Code */

const InlineCode = ({ className, ...props }: ComponentProps<'code'>) => {
    return (
        <code
            className={cn(
                'font-mono! text-[15px] font-normal', // Font
                'bg-float/40 dark:bg-float/50 rounded-md px-1.5 py-0.5', // Background
                className
            )}
            {...props}
        />
    )
}

const BlockCode = ({ className, ...props }: ComponentProps<typeof SyntaxHighlighter>) => {
    return (
        <SyntaxHighlighter
            className={cn(
                'bg-float/40 mb-5 overflow-x-auto rounded-lg px-4 py-3', // Spacing & styling
                'font-medium [&_code]:font-mono [&_code]:text-[15px]', // Font
                className
            )}
            {...props}
        />
    )
}

/* Figure */

const Figure = ({ className, ...props }: ComponentProps<'figure'>) => {
    return (
        <figure
            className={cn(
                '**:border-border mb-5 flex flex-col gap-2 pt-1', // Layout
                '[&_img]:bg-accent/50 [&_img]:max-h-[75vh] [&_img]:rounded-lg [&_img]:border [&_img]:object-contain', // Image
                '[&_figcaption]:text-secondary [&_figcaption]:text-sm [&_figcaption]:leading-relaxed', // Caption
                className
            )}
            {...props}
        />
    )
}

/* Table */

const Table = ({
    className,
    wrapperClassname,
    ...props
}: ComponentProps<'table'> & {
    wrapperClassname?: string
}) => {
    return (
        <div
            className={cn(
                'mb-5 overflow-x-auto', // Layout
                '**:border-border border-border rounded-lg border', // Border
                wrapperClassname
            )}
        >
            <table
                className={cn(
                    'w-full table-auto caption-bottom text-left', // Table
                    '[&_thead]:bg-float/40 dark:[&_thead]:bg-float/50 [&_thead_*]:font-semibold [&_thead>tr]:border-b', // Table head
                    '[&_tbody>tr]:not-last:border-b', // Table body
                    '[&_th,td]:px-4 [&_th,td]:py-2', // Cell spacing
                    '[&_th,td]:text-left [&_th,td]:[[align=center]]:text-center [&_th,td]:[[align=right]]:text-right', // Cell alignment
                    className
                )}
                {...props}
            />
        </div>
    )
}

/* Other */

const HorizontalRule = ({ className, ...props }: ComponentProps<'hr'>) => {
    return <hr className={cn('border-border my-6 sm:my-8 lg:my-10', className)} {...props} />
}

export {
    // Headings
    Heading1,
    Heading2,
    Heading3,
    Heading4,

    // Text
    Paragraph,
    Anchor,
    Strong,
    Blockquote,

    // List
    UnorderedList,
    OrderedList,

    // Code
    InlineCode,
    BlockCode,

    // Figure
    Figure,

    // Table
    Table,

    // Other
    HorizontalRule
}
