import type { ComponentProps } from 'react'

import { Paragraph, Strong } from '@/components/ui/typography'

import { cn } from '@/lib/utils'

const HighlightedStrong = ({ className, ...props }: ComponentProps<typeof Strong>) => {
    return (
        <Strong
            className={cn(
                'bg-linear-to-b from-transparent from-65% to-sky-400/20 to-65% px-0.5 dark:to-sky-600/50',
                className
            )}
            {...props}
        />
    )
}

const HomeParagraph = ({ className, ...props }: ComponentProps<typeof Paragraph>) => {
    return (
        <Paragraph
            className={cn('last-of-type:mb-1 sm:text-[17px] md:mb-4', className)}
            {...props}
        />
    )
}

export { HighlightedStrong, HomeParagraph }
