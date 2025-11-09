import type { ComponentProps } from 'react'

import ArrowedAnchor from '@/components/custom/arrowed-anchor'
import { PassageBody } from '@/components/ui/passage'
import { Paragraph, Strong } from '@/components/ui/typography'

import { cn } from '@/lib/utils'

const HighlightedStrong = ({ className, ...props }: ComponentProps<typeof Strong>) => {
    return (
        <Strong
            className={cn(
                'bg-linear-to-b from-38% to-38% bg-size-[auto_175%] px-0.5 [background-position-y:0%]', // Highlight effect
                'from-transparent to-sky-400/25 dark:to-sky-600/50', // Highlight colors
                'transition-[background] duration-400 has-[a]:hover:[background-position-y:100%]', // Contains link: expand the highlight on hover
                className
            )}
            {...props}
        />
    )
}

const HomeParagraph = ({ className, ...props }: ComponentProps<typeof Paragraph>) => {
    return (
        <Paragraph className={cn('last-of-type:mb-2 sm:text-[17px]', className)} {...props} />
    )
}

const HomePassage = ({ maps, ...props }: ComponentProps<typeof PassageBody>) => {
    return (
        <PassageBody
            maps={{
                a: (props) => <ArrowedAnchor {...props} />,
                p: (props) => <HomeParagraph {...props} />,
                strong: (props) => <HighlightedStrong {...props} />,
                ...maps
            }}
            {...props}
        />
    )
}

export { HighlightedStrong, HomeParagraph, HomePassage }
