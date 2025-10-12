import 'server-only'

import type { PostService } from '@/types/post'

import { findPageWithPostId, notionPageToPost } from './utils'

/**
 * Retrieves a single post by its id.
 *
 * @param id - The id of the post.
 * @returns A promise that resolves to the post data, or null if the post is not found.
 */
export const getSinglePost: PostService['getSingle'] = async (id) => {
    const page = await findPageWithPostId(id)

    // Page not found
    if (!page) return null

    // Process result
    const post = notionPageToPost(page)

    return post
}
