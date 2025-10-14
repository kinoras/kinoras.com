import Link from 'next/link'

import dayjs from 'dayjs'

import RepoBadge from '@/components/custom/repo-badge'
import {
    Feed,
    FeedDescription,
    FeedEntry,
    FeedList,
    FeedMedia,
    FeedTitle
} from '@/components/ui/feed'

import { cn } from '@/lib/utils'

import { Post } from '@/integrations/notion/post'

// Export block styles for skeleton
export const blockStyles = {
    media: cn(
        'col-start-9 col-end-13 md:col-start-10', // Grid layout
        'aspect-4/3 sm:aspect-3/2 md:aspect-video', // Aspect ratio
        'rounded-xl sm:rounded-2xl' // Radius
    ),
    meta: cn(
        'col-start-1 col-end-9 row-start-1 self-center md:col-end-10', // Grid layout
        'flex flex-col gap-1.5 sm:gap-2' // Inner flex-box
    ),
    root: 'grid grid-cols-12 gap-x-4 sm:gap-x-6 lg:gap-x-8' // Grid-box
}

const BlogsPosts = async () => {
    const { posts } = await Post.getList()

    return (
        <Feed>
            <FeedList>
                {posts.map(({ id, cover, title, description, project, publishAt }) => (
                    <FeedEntry key={id} className={blockStyles.root}>
                        {/* Media block */}
                        <FeedMedia className={blockStyles.media}>
                            {cover && (
                                <img
                                    className="size-full object-cover"
                                    src={cover.url}
                                    alt={title ?? cover.name}
                                />
                            )}
                        </FeedMedia>

                        {/* Meta block */}
                        <div className={blockStyles.meta}>
                            {/* Title */}
                            <FeedTitle className="line-clamp-2 sm:line-clamp-1">
                                <Link href={`/blogs/${id}`}>{title}</Link>
                            </FeedTitle>
                            {/* Date */}
                            <FeedDescription className="text-sm">
                                {dayjs.unix(publishAt).format('DD/MM/YYYY')}
                            </FeedDescription>
                            {/* Description */}
                            <FeedDescription className="line-clamp-3 sm:line-clamp-2">
                                {description}
                            </FeedDescription>
                            {/* Project */}
                            {project && <RepoBadge className="mt-1" repo={project} />}
                        </div>
                    </FeedEntry>
                ))}
            </FeedList>
        </Feed>
    )
}

export default BlogsPosts
