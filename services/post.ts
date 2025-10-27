import 'server-only'

import { unstable_cache } from 'next/cache'

import { getPostContent } from '@/integrations/notion/post/get-content'
import { getPostList } from '@/integrations/notion/post/get-list'
import { getSinglePost } from '@/integrations/notion/post/get-single'

import type { PostService } from '@/types/post'

export const Post: PostService = {
    getList: (options) =>
        unstable_cache(
            async () => getPostList(options), // Fetcher
            ['posts', JSON.stringify(options || {})], // Key
            { revalidate: 600, tags: ['posts'] } // TTL (10 min) & tags
        )(),
    getSingle: (id) =>
        unstable_cache(
            async () => getSinglePost(id), // Fetcher
            ['post', `${id}`], // Key
            { revalidate: 1800, tags: ['post', `post-${id}`] } // TTL (30 min) & tags
        )(),
    getContent: (id) =>
        unstable_cache(
            async () => getPostContent(id), // Fetcher
            ['post-content', `${id}`], // Key
            { revalidate: 1800, tags: ['post-content', `post-${id}`] } // TTL (30 min) & tags
        )()
}
