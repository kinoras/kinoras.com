import { Suspense } from 'react'

import { Metadata } from 'next'

import { Post } from '@/integrations/notion/post'

import BlogPost from './post'
import BlogPostSkeleton from './post-skeleton'

type BlogPageProps = { params: Promise<{ id: string }> }

const BlogPage = async ({ params }: BlogPageProps) => {
    const { id } = await params

    return (
        <main>
            <Suspense fallback={<BlogPostSkeleton length={4} />}>
                <BlogPost id={parseInt(id)} />
            </Suspense>
        </main>
    )
}

export const generateMetadata = async ({ params }: BlogPageProps): Promise<Metadata> => {
    const { id } = await params
    const meta = await Post.getSingle(parseInt(id))

    return {
        title: meta?.title,
        description: meta?.description
    }
}

export const dynamic = 'force-dynamic'

export default BlogPage
