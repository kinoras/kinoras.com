import type { ReactNode } from 'react'

import {
    type Icon,
    IconBrandCodepen,
    IconBrandGithub,
    IconBrandTwitter
} from '@tabler/icons-react'

export type FooterLinks = {
    icon: Icon
    href: string
    title?: ReactNode
}[]

export const links: FooterLinks = [
    {
        icon: IconBrandGithub,
        href: 'https://github.com/kinoras',
        title: 'GitHub'
    },
    {
        icon: IconBrandCodepen,
        href: 'https://codepen.io/kinoRAS',
        title: 'CodePen'
    },
    {
        icon: IconBrandTwitter,
        href: 'https://twitter.com/kinoras_macau',
        title: 'Twitter'
    }
]
