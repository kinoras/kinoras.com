import type { Anchor, File, Option } from './common'

export type Post = {
    id: number
    cover?: File
    title: string
    description: string
    tags: Option[]
    project?: Anchor
    publishAt: number
}

export type PostsQueryParameters = {
    order: 'ascending' | 'descending'
    cursor: string
    limit: number
}

export type PostsQueryResponse = {
    data: Post[]
    nextCursor: string | null
}

// export type PostContent = ...
