import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { isFullPage } from '@notionhq/client'

import { notion } from '@/integrations/notion/client'

import type { PostService } from '@/types/post'

import { BLOGS_DATASOURCE_ID, notionPageToPost } from './utils'

/**
 * Queries a list of blog posts from the Notion data source.
 *
 * @param options - Query parameters.
 * @returns Promise that resolves to an object containing the list of posts and next cursor.
 */
export const getPostList: PostService['getList'] = async ({
    order = 'descending',
    limit = 100,
    cursor
} = {}) => {
    'use cache'
    cacheLife('hours')
    cacheTag('post')

    try {
        // Retrieve posts
        const { results, next_cursor } = await notion.dataSources.query({
            data_source_id: BLOGS_DATASOURCE_ID!,
            filter: { property: 'Status', status: { equals: 'Public' } }, // Query only public posts
            sorts: [{ property: 'Date', direction: order }],
            start_cursor: cursor,
            page_size: limit
        })

        // Process results
        const posts = results
            .filter(isFullPage) // Mainly for ensuring type safety
            .map(notionPageToPost)

        return {
            posts,
            nextCursor: next_cursor
        }
    } catch (error) {
        return {
            posts: [],
            nextCursor: null
        }
    }
}
