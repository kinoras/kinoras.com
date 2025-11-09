import { Suspense } from 'react'

import { Metadata } from 'next'

import { Post } from '@/services/post'

import BlogPost from './post'
import BlogPostSkeleton from './post-skeleton'

type BlogPageProps = { params: Promise<{ id: string }> }

const BlogPage = ({ params }: BlogPageProps) => {
    return (
        <main>
            <Suspense fallback={<BlogPostSkeleton length={4} />}>
                <BlogPost id={params.then(({ id }) => id)} />
            </Suspense>
        </main>
    )
}

export const generateMetadata = async ({ params }: BlogPageProps): Promise<Metadata> => {
    const { id } = await params
    const meta = await Post.getSingle(id)

    return {
        title: meta?.title,
        description: meta?.description
    }
}

export default BlogPage
