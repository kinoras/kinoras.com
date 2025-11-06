import { ReactNode } from 'react'

export type InterestGroup = {
    icon: ReactNode
    name: string
    items: ReactNode[]
}

export const interests: InterestGroup[] = [
    {
        icon: '🎧',
        name: 'Music',
        items: [
            'DAOKO',
            'Fujikawa Chiai',
            'Keyakizaka46',
            'Nishino Kana',
            'Perfume',
            'YOASOBI',
            'Yorushika',
            <span className="proportional">『Yuika』</span>
        ]
    },
    {
        icon: '🎮',
        name: 'Rhythm game',
        items: ['Project Sekai']
    },
    {
        icon: '🌈',
        name: 'Virtual idols',
        items: ['Furen E Lustario', 'Ishigami Nozomi', 'Kuramochi Meruto', 'Shioriha Ruri']
    }
]
