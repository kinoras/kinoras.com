import 'server-only'

import { unstable_cache } from 'next/cache'

import type { PostService } from '@/types/post'

import { getPostContent } from './get-content'
import { getPostList } from './get-list'
import { getSinglePost } from './get-single'

export const DATASOURCE_ID = process.env.NOTION_DATASOURCE_ID

export const Post: PostService = {
    getList: (options) =>
        unstable_cache(
            async () => getPostList(options), // Fetcher
            ['posts', JSON.stringify(options || {})], // Key
            { revalidate: 3600, tags: ['posts'] } // TTL & tags
        )(),
    getSingle: (id) =>
        unstable_cache(
            async () => getSinglePost(id), // Fetcher
            ['post', `${id}`], // Key
            { revalidate: 3600, tags: ['post', `post-${id}`] } // TTL & tags
        )(),
    getContent: (id) =>
        unstable_cache(
            async () => getPostContent(id), // Fetcher
            ['post-content', `${id}`], // Key
            { revalidate: 3600, tags: ['post-content', `post-${id}`] } // TTL & tags
        )()
}
