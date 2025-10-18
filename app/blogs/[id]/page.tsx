import Link from 'next/link'
import { notFound } from 'next/navigation'

import dayjs from 'dayjs'

import { Passage, PassageBody, PassageHeader, PassageTitle } from '@/components/ui/passage'

import { Post } from '@/integrations/notion/post'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const [main, passage] = await Promise.all([
        Post.getSingle(parseInt(id)),
        Post.getContent(parseInt(id))
    ])

    if (!main || passage === null) {
        notFound()
    }

    return (
        <main>
            <Passage>
                <PassageHeader>
                    <span className="text-secondary">
                        <Link href="/blogs">Blogs</Link> /
                    </span>
                    <PassageTitle className="proportional">{main.title}</PassageTitle>
                    <span className="text-secondary">
                        {dayjs.unix(main.publishAt).format('DD/MM/YYYY')}
                    </span>
                </PassageHeader>

                <PassageBody content={passage} />
            </Passage>
        </main>
    )
}

// export const revalidate = 30
export const dynamic = 'force-dynamic' // Disable caching (instant updates)

export default BlogPage
