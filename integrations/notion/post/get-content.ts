import 'server-only'

import { notFound } from 'next/navigation'

import { NotionToMarkdown } from 'notion-to-md'

import type { NotionPageId } from '@/types/notion'
import type { PostId, PostService } from '@/types/post'

import { notion } from '../client'
import { DATASOURCE_ID } from './index'

const n2m = new NotionToMarkdown({ notionClient: notion })

/**
 * Retrieves the markdown content of a post by its ID.
 *
 * @param id - The id of the post.
 * @returns A promise that resolves to the markdown content of the post.
 * @throws Triggers the 404 page if the post with the given id is not found.
 */
export const getPostContent: PostService['getContent'] = async (id) => {
    // Convert PostId to NotionPageId
    const pageId = await getPageIdByPostId(id)

    if (!pageId) {
        notFound()
    }

    // Convert the page to markdown
    const mdBlocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdBlocks)

    return mdString.parent
}

/**
 * Converts a post id to its corresponding Notion PageId.
 *
 * @param postId - The PostId of the post.
 * @returns A promise that resolves to the Notion PageId, or null if not found.
 */
const getPageIdByPostId = async (postId: PostId): Promise<NotionPageId | null> => {
    const response = await notion.dataSources.query({
        data_source_id: DATASOURCE_ID!,
        filter: {
            property: 'ID',
            unique_id: { equals: postId }
        }
    })

    return response.results.length > 0
        ? response.results[0].id // First result (which should also be the only result)
        : null // Page not found
}
