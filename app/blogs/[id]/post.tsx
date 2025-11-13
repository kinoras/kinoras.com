import Link from 'next/link'
import { notFound } from 'next/navigation'

import dayjs from 'dayjs'

import { RepoBadge } from '@/components/custom/anchor-badges'
import SmartImage from '@/components/custom/smart-image'
import { Badge } from '@/components/ui/badge'
import { Passage, PassageBody, PassageHeader, PassageTitle } from '@/components/ui/passage'
import { Figure } from '@/components/ui/typography'

import { Post } from '@/services/post'

import type { PostId } from '@/types/post'

const BlogPost = async ({ id }: { id: Promise<PostId> }) => {
    const [meta, content] = await Promise.all([
        Post.getSingle(await id),
        Post.getContent(await id)
    ])

    if (!meta || content === null) {
        notFound()
    }

    const { title, description, project, tags, publishAt } = meta

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
                {(project || tags.length > 0) && (
                    <div className="flex flex-wrap gap-2">
                        {project && <RepoBadge repo={project} />}
                        {tags.map((tag) => (
                            <Badge variant="outline" key={tag.name}>
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                )}
            </PassageHeader>

            {/* Content */}
            <PassageBody
                content={content}
                maps={{
                    img: ({ src, alt, height, width, ...props }) => (
                        <Figure>
                            <SmartImage
                                src={String(src)}
                                alt={alt ?? ''}
                                fallback="/fallbacks/blog-media.svg"
                                height={200}
                                width={832}
                                {...props}
                            />
                            <figcaption>{alt}</figcaption>
                        </Figure>
                    )
                }}
            />
        </Passage>
    )
}

export default BlogPost
