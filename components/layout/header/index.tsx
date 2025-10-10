'use client'

import { memo } from 'react'
import type { ComponentProps } from 'react'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { IconCode, IconMessage, IconUserSquareRounded } from '@tabler/icons-react'

import {
    Header,
    HeaderActionButtonFallback,
    HeaderActions,
    HeaderNav,
    HeaderNavLink,
    HeaderNavMenu,
    HeaderSeparator
} from '@/components/ui/header'

import HomeAnchor from './home-anchor'

const ThemeToggle = dynamic(() => import('./theme-toggle'), {
    ssr: false,
    loading: () => <HeaderActionButtonFallback />
})

const PageHeader = (props: ComponentProps<typeof Header>) => {
    const pathname = usePathname()
    return (
        <Header {...props}>
            <HeaderNav>
                <HomeAnchor />
                <HeaderNavMenu alignment="right">
                    <HeaderNavLink
                        href="/about"
                        icon={[IconUserSquareRounded]}
                        title="About"
                        active={pathname === '/about'}
                    />
                    <HeaderNavLink
                        href="/blogs"
                        icon={[IconMessage]}
                        title="Blogs"
                        active={pathname.startsWith('/blogs')}
                    />
                    <HeaderNavLink
                        href="/projects"
                        icon={[IconCode, 26]}
                        title="Projects"
                        active={pathname.startsWith('/projects')}
                    />
                </HeaderNavMenu>
            </HeaderNav>

            <HeaderSeparator className="bg-quinary" />

            <HeaderActions>
                <ThemeToggle />
            </HeaderActions>
        </Header>
    )
}

export default memo(PageHeader)
