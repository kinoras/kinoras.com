'use client'

import { useTheme } from 'next-themes'

import { IconBrightness, IconMoon, IconSun } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'

import { HeaderActionButton } from '@/components/ui/header'

type Theme = 'light' | 'dark' | 'system'

type ThemeProfiles = {
    [T in Theme]: {
        icon: Icon
        size?: number
        next: Theme
    }
}

const themeProfiles: ThemeProfiles = {
    light: { icon: IconSun, size: 24, next: 'dark' },
    dark: { icon: IconMoon, next: 'system' },
    system: { icon: IconBrightness, next: 'light' }
}

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const current = themeProfiles[theme as Theme] ?? themeProfiles.system

    return (
        <HeaderActionButton
            className="relative overflow-hidden"
            onClick={() => setTheme(current.next)}
            iconOnly
        >
            <AnimatePresence>
                <motion.div
                    key={theme}
                    className="absolute"
                    initial={{ opacity: 0, translateY: '100%' }}
                    animate={{ opacity: 1, translateY: '0' }}
                    exit={{ opacity: 0, translateY: '-100%' }}
                >
                    <current.icon
                        className="size-unset"
                        stroke={1.5}
                        size={current.size ?? 22}
                    />
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Switch theme</span>
        </HeaderActionButton>
    )
}

export default ThemeToggle
