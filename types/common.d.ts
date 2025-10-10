type Color =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'lime'
    | 'emerald'
    | 'cyan'
    | 'blue'
    | 'violet'
    | 'pink'
    | 'base'

export type Anchor = {
    href: string
    title?: string
}

export type File = {
    name: string
    url: string
    expiry?: number
}

export type Option = {
    name: string
    color: Color | undefined
}
