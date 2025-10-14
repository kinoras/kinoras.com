import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Feed = ({ className, children, ...props }: ComponentProps<'section'>) => {
    return (
        <section data-slot="newsfeed" className={cn('wrapper', className)} {...props}>
            <div data-slot="newsfeed-container" className="container">
                {children}
            </div>
        </section>
    )
}

const FeedList = ({ ...props }: ComponentProps<'ul'>) => {
    return <ul data-slot="newsfeed-list" {...props} />
}

const FeedEntry = ({ className, ...props }: ComponentProps<'li'>) => {
    return (
        <li
            data-slot="newsfeed-entry"
            className={cn(
                'py-6 sm:py-8', // Spacing
                'border-border not-last-of-type:border-b', // Separator
                'relative **:not-[data-slot=newsfeed-entry-title]:[&_a]:z-2', // Make descendant anchors clickable (stay above the title anchor)
                'group/feed', // For descendant effects
                className
            )}
            {...props}
        />
    )
}

const FeedMedia = ({ className, ...props }: ComponentProps<'div'>) => {
    return (
        <div
            data-slot="newsfeed-entry-media"
            className={cn(
                'bg-accent/50 overflow-hidden',
                '[&_img,video]:transition [&_img,video]:duration-400 group-hover/feed:[&_img,video]:scale-105', // Scale the media when entry hovered
                className
            )}
            {...props}
        />
    )
}

const FeedTitle = ({ className, ...props }: ComponentProps<'h3'>) => {
    return (
        <h3
            data-slot="newsfeed-entry-title"
            className={cn(
                'text-lg leading-snug font-medium sm:text-xl',
                '[&>a]:before:absolute [&>a]:before:inset-0 [&>a]:before:z-1', // Extend the anchor area to the entire entry
                '[&>a]:hover:decoration-secondary [&>a]:underline [&>a]:decoration-transparent [&>a]:underline-offset-4 [&>a]:transition-all', // Hover effect
                className
            )}
            {...props}
        />
    )
}

const FeedDescription = ({ className, ...props }: ComponentProps<'p'>) => {
    return (
        <p
            data-slot="newsfeed-entry-description"
            className={cn('text-secondary leading-snug', className)}
            {...props}
        />
    )
}

export { Feed, FeedDescription, FeedEntry, FeedList, FeedMedia, FeedTitle }
