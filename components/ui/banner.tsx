import type { ComponentProps } from 'react'

import { Icon } from '@tabler/icons-react'

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

const BannerContent = ({ className, ...props }: ComponentProps<'div'>) => {
    return (
        <div
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
                'leading-[1.175]! tracking-tight', // Text styles
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
                'text-secondary leading-snug!', // Text styles
                'text-md sm:text-lg', // Font size
                className
            )}
            {...props}
        />
    )
}

const BannerBar = ({ className, ...props }: ComponentProps<'span'>) => {
    return (
        <span
            className={cn(
                'bg-theme/85 h-1 w-8 sm:w-10',
                'mt-6 -mb-6 sm:mt-8 md:mt-10', // Vertical spacing
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

const BannerIconBackground = ({
    icon: BackgroundIcon,
    stroke = 0.75,
    opacity = 0.1,
    className,
    ...props
}: ComponentProps<typeof BannerBackground> & {
    icon: Icon
    stroke?: number
    opacity?: number
}) => {
    return (
        <BannerBackground
            className="container flex w-auto! items-center justify-end"
            style={{ insetInline: 'max(calc((100vw - 1024px) / 2), 0px)' }}
            {...props}
        >
            <BackgroundIcon
                className={cn(
                    'text-theme inset-y-0 right-0',
                    'size-44 translate-x-5',
                    'sm:size-48 sm:translate-x-5.5',
                    'md:size-56 md:translate-x-6',
                    className
                )}
                style={{ opacity }}
                stroke={stroke}
            />
        </BannerBackground>
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
    BannerBar,
    BannerContent,
    BannerDescription,
    BannerDotBackground,
    BannerGridBackground,
    BannerIconBackground,
    BannerTitle
}
