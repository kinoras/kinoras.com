import 'server-only'

import { NotionToMarkdown } from 'notion-to-md'

import type { PostService } from '@/types/post'

import { notion } from '../client'
import { findPageWithPostId } from './utils'

const n2m = new NotionToMarkdown({ notionClient: notion })

/**
 * Retrieves the markdown content of a post by its id.
 *
 * @param id - The id of the post.
 * @returns A promise that resolves to the markdown content of the post, or null if the post is not found or an error occurred.
 */
export const getPostContent: PostService['getContent'] = async (id) => {
    try {
        const page = await findPageWithPostId(id)

        // Page not found
        if (!page) throw new Error('Page not found.')

        // Convert the page to markdown
        const mdBlocks = await n2m.pageToMarkdown(page.id)
        const mdString = n2m.toMarkdownString(mdBlocks)

        return mdString.parent
    } catch (error) {
        return null
    }
}
