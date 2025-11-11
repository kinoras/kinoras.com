import type { ComponentProps, ReactNode } from 'react'

import NextImage from 'next/image'

const Image = (props: ComponentProps<typeof NextImage>) => {
    return <NextImage height={96} width={96} {...props} />
}

export type Timeline = {
    icon?: ReactNode
    title: ReactNode
    period: ReactNode
    description: ReactNode
}[]

export const timeline: Timeline = [
    {
        icon: <Image src="/assets/ntu.webp" alt="National Taiwan University" />,
        title: 'Studied in National Taiwan University',
        period: '09/2021 - 07/2025',
        description: 'Bachelor of Computer Science and Information Engineering (CSIE).'
    },
    {
        icon: <Image src="/assets/worldskills.webp" alt="WorldSkills" />,
        title: 'Participated in WorldSkills Kazan 2019',
        period: '08/2019',
        description: `Competitor and silver medalist in Web Technologies (Junior), representing Macau.`
    },
    {
        title: 'Participated in Macau Students Mobile Web Design Competition',
        period: '10/2018',
        description: `Competitor and runner-up in the secondary students’ competition.`
    },
    {
        icon: '👨🏻‍💻',
        title: 'Started coding',
        period: '2017',
        description: `Learnt foundational web development skills at CPTTM.`
    }
]
