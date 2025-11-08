import { ReactNode } from 'react'

export type Tags = {
    icon?: ReactNode
    title: ReactNode
    description: ReactNode
}[]

export const tags: Tags = [
    {
        icon: '🇲🇴',
        title: 'Macau',
        description: 'The place where I was born and brought up.'
    },
    {
        icon: '🇹🇼',
        title: 'Taipei, Taiwan',
        description: 'The city where I am currently based.'
    },
    {
        icon: '🧑🏻‍💻',
        title: 'Full-Stack Developer',
        description: 'Working mainly with Next.js, Express, and various types of databases.'
    },
    {
        icon: '🥷',
        title: 'Coding Ninja (Retired)',
        description: 'Once wrote wild spaghetti in PHP with Vanilla JS and Vue 2.'
    }
]

export const profile: string = `
Born and brought up in **🇲🇴 Macau**.
Currently based in **🇹🇼 Taipei, Taiwan**.

A **🧑🏻‍💻 full-stack developer**, working mainly with _Next.js_, _Express_ and various types of _databases_.

A former **🥷 coding ninja**, once wrote spaghetti in _PHP_ and _Vanilla JS_ or _Vue 2_.
`
