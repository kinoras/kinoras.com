import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Banner = ({ className, ...props }: ComponentProps<'section'>) => {
    return (
        <section
            data-slot="banner"
            className={cn(
                'wrapper relative overflow-hidden', // Appearance
                className
            )}
            {...props}
        />
    )
}

const BannerContent = ({ className, ...props }: ComponentProps<'article'>) => {
    return (
        <article
            data-slot="banner-content"
            className={cn(
                'container',
                'flex flex-col justify-center gap-2 sm:gap-3', // Layout
                'my-10 sm:my-12 md:my-14', // Edge spacing
                className
            )}
            {...props}
        />
    )
}

const BannerTitle = ({ className, ...props }: ComponentProps<'h1'>) => {
    return (
        <h1
            data-slot="banner-title"
            className={cn(
                'leading-[1.125]! tracking-tight', // Text styles
                'text-4xl sm:text-5xl md:text-6xl', // Font size
                '-mt-1.5 -ml-px sm:-mt-2 sm:-ml-0.5 md:-mt-3.5', // Position
                className
            )}
            {...props}
        />
    )
}

const BannerDescription = ({ className, ...props }: ComponentProps<'p'>) => {
    return (
        <p
            data-slot="banner-description"
            className={cn(
                'text-primary/50 leading-snug!', // Text styles
                'text-md sm:text-lg', // Font size
                className
            )}
            {...props}
        />
    )
}

const BannerBackground = ({ className, ...props }: ComponentProps<'div'>) => {
    return (
        <div
            data-slot="banner-background"
            className={cn('absolute inset-0 -z-10 select-none', className)}
            {...props}
        />
    )
}

const BannerGridBackground = ({
    color = 'var(--color-theme)',
    gap = 24,
    stroke = 1,
    ...props
}: ComponentProps<typeof BannerBackground> & {
    color?: string
    gap?: number
    stroke?: number
}) => {
    return (
        <BannerBackground
            style={{
                inset: -10,
                backgroundSize: `${gap}px ${gap}px`,
                backgroundImage: [
                    `linear-gradient(to right, ${color} ${stroke}px, transparent ${stroke}px)`,
                    `linear-gradient(to bottom, ${color} ${stroke}px, transparent ${stroke}px)`
                ].join(',')
            }}
            {...props}
        />
    )
}

const BannerDotBackground = ({
    color = 'var(--color-theme)',
    gap = 24,
    radius = 1,
    ...props
}: ComponentProps<typeof BannerBackground> & {
    color?: string
    gap?: number
    radius?: number
}) => {
    return (
        <BannerBackground
            style={{
                inset: -10,
                backgroundSize: `${gap}px ${gap}px`,
                backgroundImage: `radial-gradient(${color} ${radius}px, transparent ${radius}px)`
            }}
            {...props}
        />
    )
}

export {
    Banner,
    BannerBackground,
    BannerContent,
    BannerDescription,
    BannerDotBackground,
    BannerGridBackground,
    BannerTitle
}
