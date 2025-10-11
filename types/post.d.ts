import type { File, Option } from './common'

export type PostId = number

export type PostData = {
    id: PostId
    /** Cover image of the post. */
    cover: File | null
    /** Emoji icon for the post. */
    icon: string | null
    /** Title of the post. */
    title: string | null
    /** Subtitle of the post. */
    description: string | null
    /** Tags of the post. */
    tags: Option[]
    /** The GitHub repository related to the post. */
    project: string | null
    /** Timestamp of the post. */
    publishAt: number
}

export type PostService = {
    getList: (options?: Partial<PostListQueryOptions>) => Promise<PostListQueryResponse>
    getContent: (id: PostId) => Promise<string>
}

type PostListQueryOptions = {
    order: 'ascending' | 'descending'
    cursor: string
    limit: number
}

type PostListQueryResponse = {
    posts: PostData[]
    nextCursor: string | null
}

// export type PostContent = ...
