import { FeedEntry, FeedList, FeedSection } from '@/components/ui/feed'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

import { blockStyles } from './posts'

const BlogsPostSkeleton = ({ length = 3 }: { length?: number }) => {
    return (
        <FeedSection>
            <FeedList>
                {Array.from({ length }).map((_, index) => (
                    <FeedEntry key={index} className={blockStyles.root}>
                        {/* Media block */}
                        <Skeleton className={blockStyles.media} />

                        {/* Meta block */}
                        <div className={cn(blockStyles.meta, '*:mb-px')}>
                            {/* Title */}
                            <Skeleton className="h-5.5 w-4/5 sm:h-6 sm:w-3/4 md:w-2/3" />
                            {/* Date */}
                            <Skeleton className="my-1! h-4 w-20" />
                            {/* Description */}
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-4/5 sm:w-3/4 md:w-2/3" />
                            {/* Project */}
                            <Skeleton className="mb:0! mt-1.5 h-6 w-38" />
                        </div>
                    </FeedEntry>
                ))}
            </FeedList>
        </FeedSection>
    )
}

export default BlogsPostSkeleton
