import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Timeline = ({ className, ...props }: ComponentProps<'ul'>) => {
    return <ul data-slot="timeline" className={cn('pl-5.5', className)} {...props} />
}

const TimelineItem = ({
    variant = 'extensive',
    className,
    ...props
}: ComponentProps<'li'> & {
    variant?: 'extensive' | 'inclusive'
}) => {
    return (
        <li
            data-slot="timeline-item"
            className={cn(
                'border-border relative border-l pt-px pl-10',
                'flex flex-col gap-1.5 **:leading-tight', // Inner layout
                'before:absolute before:top-0 before:-left-1.5 before:mt-1.5 before:size-3 sm:before:mt-2', // Icon placeholder: position
                'before:bg-border before:ring-background before:rounded-full before:ring-4', // Icon placeholder: appearance
                variant === 'extensive' ? 'not-last:pb-8' : 'mb-4.5 pb-3.5', // Bottom border
                variant === 'inclusive' && [
                    'after:absolute after:bottom-0 after:left-0 after:h-20 after:w-8', // Pseudo element for boundary curve
                    'after:border-border after:border-b [&,&:after]:rounded-bl-xl' // Rounded inclusive border
                ],
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
                'absolute top-0 -left-6 size-12', // Position
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
