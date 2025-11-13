'use server'

import { updateTag } from 'next/cache'

import type { PostId } from '@/types/post'

export type RevalidateOptions = {
    /** Posts to be revalidated */
    posts?:
        | { all: true } // Revalidate all posts
        | { all: false; items: PostId[] } // Revalidate selected posts

    /** Projects to be revalidated */
    notionProjects?: { all: true } // Revalidate all projects on Notion
    githubProjects?: { all: true } // Revalidate all projects on GitHub
}

const revalidateAllPosts = () => {
    updateTag('posts')
    updateTag('post')
    updateTag('post-content')
}

const revalidateSinglePost = (id: PostId) => {
    updateTag(`post-${id}`)
}

const revalidateAllNotionProjects = () => {
    updateTag('projects-notion')
}

const revalidateAllGithubProjects = () => {
    updateTag('projects-github')
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
    if (options.notionProjects) {
        revalidateAllNotionProjects()
    }
    if (options.githubProjects) {
        revalidateAllGithubProjects()
    }
}
