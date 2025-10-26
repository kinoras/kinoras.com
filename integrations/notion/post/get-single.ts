import 'server-only'

import type { PostService } from '@/types/post'

import { findPageWithPostId, notionPageToPost } from './utils'

/**
 * Retrieves a single post by its id.
 *
 * @param id - The id of the post.
 * @returns A promise that resolves to the post data, or null if the post is not found or an error occurred.
 */
export const getSinglePost: PostService['getSingle'] = async (id) => {
    try {
        const page = await findPageWithPostId(id)

        if (!page) throw new Error('Page not found.')

        // Process result
        const post = notionPageToPost(page)

        return post
    } catch (error) {
        return null
    }
}
