import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Timeline = ({ className, ...props }: ComponentProps<'ul'>) => {
    return (
        <ul
            data-slot="timeline"
            className={cn('border-border ml-5.5 border-l', className)}
            {...props}
        />
    )
}

const TimelineItem = ({ className, ...props }: ComponentProps<'li'>) => {
    return (
        <li
            data-slot="timeline-item"
            className={cn(
                'relative mt-px mb-8 ml-10',
                'flex flex-col gap-1.5 **:leading-tight', // Inner layout
                'before:absolute before:top-0 before:-left-11.5 before:mt-1.5 before:size-3 sm:before:mt-2', // Icon placeholder: position
                'before:bg-border before:ring-background before:rounded-full before:ring-4', // Icon placeholder: appearance
                className
            )}
            {...props}
        />
    )
}

const TimelineIcon = ({ className, ...props }: ComponentProps<'div'>) => {
    return (
        <div
            data-slot="timeline-icon"
            className={cn(
                'absolute top-0 -left-16 size-12', // Position
                'border-border ring-background bg-border rounded-full border ring-4', // Appearance
                'flex items-center justify-center overflow-hidden', // Layout
                'text-3xl [&>img]:size-11.5 [&>img]:object-cover [&>svg]:size-8', // Icon elements
                className
            )}
            {...props}
        />
    )
}

export { Timeline, TimelineItem, TimelineIcon }
