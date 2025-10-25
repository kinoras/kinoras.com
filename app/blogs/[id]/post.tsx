import Link from 'next/link'
import { notFound } from 'next/navigation'

import dayjs from 'dayjs'

import { Passage, PassageBody, PassageHeader, PassageTitle } from '@/components/ui/passage'

import { Post } from '@/integrations/notion/post'

const BlogPost = async ({ id }: { id: number }) => {
    const [meta, content] = await Promise.all([Post.getSingle(id), Post.getContent(id)])

    if (!meta || content === null) {
        notFound()
    }

    const { title, publishAt } = meta

    return (
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
    )
}

export default BlogPost
