import { Feed, FeedEntry } from '@/components/ui/feed'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

import { blockStyles } from './feed'

const ProjectsFeedSkeleton = ({ length = 3 }: { length?: number }) => {
    return (
        <Feed className={blockStyles.wrapper}>
            {Array.from({ length }).map((_, index) => (
                <FeedEntry key={index} className={blockStyles.root}>
                    {/* Media block */}
                    <div className={blockStyles.media.container}>
                        {/* Project hero */}
                        <Skeleton className={blockStyles.media.hero} />
                    </div>

                    {/* Meta block */}
                    <div className={cn(blockStyles.meta, '*:my-0.5 sm:*:my-[3px]')}>
                        {/* Title */}
                        <Skeleton className="h-5.5 w-25 sm:h-6" />
                        {/* Description */}
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="mt-0.5! h-4 w-4/5 sm:mt-0! sm:w-3/4 md:w-2/3" />
                        {/* Links */}
                        <Skeleton className="my-1.5! mb-0! h-6 w-20" />
                    </div>
                </FeedEntry>
            ))}
        </Feed>
    )
}

export default ProjectsFeedSkeleton
