import Link from 'next/link'
import { notFound } from 'next/navigation'

import dayjs from 'dayjs'

import RepoBadge from '@/components/custom/repo-badge'
import { Passage, PassageBody, PassageHeader, PassageTitle } from '@/components/ui/passage'

import { Post } from '@/integrations/notion/post'
import { PostId } from '@/types/post'

const BlogPost = async ({ id }: { id: PostId }) => {
    const [meta, content] = await Promise.all([Post.getSingle(id), Post.getContent(id)])

    if (!meta || content === null) {
        notFound()
    }

    const { title, description, project, publishAt } = meta

    return (
        <Passage>
            <PassageHeader>
                {/* Breadcrumb · Date */}
                <span className="text-secondary">
                    <Link href="/blogs">Blogs</Link>
                    <span> · </span>
                    {dayjs.unix(publishAt).format('DD/MM/YYYY')}
                </span>

                {/* Title */}
                <PassageTitle>{title}</PassageTitle>

                {/* Description */}
                <span className="text-secondary">{description}</span>

                {/* Project */}
                {project && <RepoBadge repo={project} />}
            </PassageHeader>

            {/* Content */}
            <PassageBody content={content} />
        </Passage>
    )
}

export default BlogPost
