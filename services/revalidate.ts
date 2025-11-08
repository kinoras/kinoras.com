'use server'

import { revalidateTag } from 'next/cache'

import type { PostId } from '@/types/post'

export type RevalidateOptions = {
    /** Posts to be revalidated */
    posts?:
        | { all: true } // Revalidate all posts
        | { all: false; items: PostId[] } // Revalidate selected posts

    /** Projects to be revalidated */
    projects?: { all: true } // Revalidate all projects
}

const revalidateAllPosts = () => {
    revalidateTag('posts')
    revalidateTag('post')
    revalidateTag('post-content')
}

const revalidateSinglePost = (id: PostId) => {
    revalidateTag(`post-${id}`)
}

const revalidateAllProjects = () => {
    revalidateTag('projects')
}

export const revalidate = async (
    secret: string,
    options: RevalidateOptions = {}
): Promise<void> => {
    // Validate the secret
    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
        throw new Error('Revalidate secret mismatch.')
    }

    // Posts
    if (options.posts) {
        options.posts.all
            ? revalidateAllPosts()
            : options.posts.items.forEach((id) => revalidateSinglePost(id))
    }

    // Projects
    if (options.projects) {
        revalidateAllProjects()
    }
}
