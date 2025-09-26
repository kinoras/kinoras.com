import type { ComponentProps } from 'react'

import Link from 'next/link'

import { IconLoader } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Separator } from './separator'

const Header = ({
    withBorder = true,
    className,
    children,
    ...restProps
}: ComponentProps<'header'> & {
    withBorder?: boolean
}) => {
    return (
        <header
            data-slot="header"
            className={cn(
                'border-border bg-background wrapper h-header-height sticky top-0',
                withBorder && 'border-b',
                className
            )}
            {...restProps}
        >
            <div
                data-slot="header-container"
                className="container flex items-center"
            >
                {children}
            </div>
        </header>
    )
}

const HeaderNav = ({ className, ...restProps }: ComponentProps<'nav'>) => {
    return (
        <nav
            className={cn('flex flex-1 items-center', className)}
            {...restProps}
        />
    )
}

const HeaderNavMenu = ({
    alignment = 'left',
    className,
    ...restProps
}: ComponentProps<'ul'> & {
    alignment?: 'left' | 'right'
}) => {
    return (
        <ul
            className={cn(
                'mx-0.5 flex flex-1 gap-2.25 sm:gap-0.5',
                alignment === 'right' && 'justify-end',
                className
            )}
            {...restProps}
        />
    )
}

const HeaderNavLink = ({
    href,
    icon = [IconLoader],
    title,
    active = false,
    className,
    children,
    ...restProps
}: ComponentProps<typeof Link> & {
    icon?: [icon: Icon, size?: number]
    title: string
    active?: boolean
}) => {
    // Destructure icons
    const [LinkIcon, size = 24] = icon

    return (
        <li>
            <Button
                variant="ghost"
                className={cn(
                    'h-10 w-10 rounded-full', // Mobile layout
                    'sm:h-9 sm:w-auto sm:rounded-lg sm:px-3', // Desktop layout
                    className
                )}
                asChild
            >
                <Link href={href} {...restProps}>
                    {/* Mobile icon */}
                    <LinkIcon
                        size={size}
                        stroke={active ? 2.25 : 1.5}
                        className={cn(
                            'size-unset transition-all sm:hidden',
                            active && 'text-theme'
                        )}
                    />
                    {/* Desktop text */}
                    <span
                        className={cn(
                            'hidden text-base font-normal transition-all sm:block',
                            active && 'text-theme font-bold'
                        )}
                    >
                        {title}
                    </span>
                </Link>
            </Button>
        </li>
    )
}

const HeaderActions = ({ className, ...restProps }: ComponentProps<'div'>) => {
    return (
        <div
            data-slot="header-actions"
            className={cn('-me-2.5 flex items-center gap-0.5', className)}
            {...restProps}
        />
    )
}

const HeaderActionButton = ({
    iconOnly = false,
    className,
    ...restProps
}: Omit<ComponentProps<typeof Button>, 'variant'> & {
    iconOnly?: boolean
}) => {
    return (
        <Button
            data-slot="header-action-item"
            variant="ghost"
            className={cn(
                'h-10 cursor-pointer rounded-full',
                iconOnly && 'w-10',
                className
            )}
            {...restProps}
        />
    )
}

const HeaderActionButtonFallback = () => {
    return (
        <span
            data-slot="header-action-item-placeholder"
            className="inline-flex h-10 w-10 items-center justify-center"
        >
            <IconLoader stroke={1.5} size={22} className="opacity-25" />
        </span>
    )
}

const HeaderSeparator = ({
    className,
    ...restProps
}: Omit<ComponentProps<typeof Separator>, 'orientation'>) => {
    return (
        <Separator
            orientation="vertical"
            className={cn('mx-2.5 h-5!', className)}
            {...restProps}
        />
    )
}

export {
    Header,
    HeaderActionButton,
    HeaderActionButtonFallback,
    HeaderActions,
    HeaderNav,
    HeaderNavLink,
    HeaderNavMenu,
    HeaderSeparator
}
