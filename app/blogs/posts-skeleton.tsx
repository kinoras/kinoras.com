import { Feed, FeedEntry, FeedList } from '@/components/ui/feed'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

import { blockStyles } from './posts'

const BlogsPostSkeleton = ({ length = 3 }: { length?: number }) => {
    return (
        <Feed>
            <FeedList>
                {Array.from({ length }).map((_, index) => (
                    <FeedEntry key={index} className={blockStyles.root}>
                        {/* Media block */}
                        <Skeleton className={blockStyles.media} />

                        {/* Meta block */}
                        <div className={cn(blockStyles.meta, '*:my-0.5 sm:*:my-[3px]')}>
                            {/* Title */}
                            <Skeleton className="h-5.5 w-4/5 sm:h-6 sm:w-3/4 md:w-2/3" />
                            {/* Date */}
                            <Skeleton className="h-4 w-20" />
                            {/* Description */}
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="mt-0.5! h-4 w-4/5 sm:mt-0! sm:w-3/4 md:w-2/3" />
                            {/* Project */}
                            <Skeleton className="mt-1.5 mb-0! h-6 w-38" />
                        </div>
                    </FeedEntry>
                ))}
            </FeedList>
        </Feed>
    )
}

export default BlogsPostSkeleton
