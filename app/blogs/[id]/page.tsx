import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import dayjs from 'dayjs'

import { Passage, PassageBody, PassageHeader, PassageTitle } from '@/components/ui/passage'

import { Post } from '@/integrations/notion/post'

type BlogPageProps = { params: Promise<{ id: string }> }

const BlogPage = async ({ params }: BlogPageProps) => {
    const { id } = await params
    const [meta, content] = await Promise.all([
        Post.getSingle(parseInt(id)),
        Post.getContent(parseInt(id))
    ])

    if (!meta || content === null) {
        notFound()
    }

    const { title, publishAt } = meta

    return (
        <main>
            <Passage>
                <PassageHeader>
                    <span className="text-secondary">
                        <Link href="/blogs">Blogs</Link> /
                    </span>
                    <PassageTitle>{title}</PassageTitle>
                    <span className="text-secondary">
                        {dayjs.unix(publishAt).format('DD/MM/YYYY')}
                    </span>
                </PassageHeader>

                <PassageBody content={content} />
            </Passage>
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

// export const revalidate = 30
export const dynamic = 'force-dynamic' // Disable caching (instant updates)

export default BlogPage
