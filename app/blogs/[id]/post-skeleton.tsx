import { Passage, PassageHeader } from '@/components/ui/passage'
import { Skeleton } from '@/components/ui/skeleton'

const BlogPostSkeleton = ({ length = 3 }: { length?: number }) => {
    return (
        <Passage>
            <PassageHeader>
                {/* Breadcrumb */}
                <Skeleton className="my-1! h-4.5 w-16" />
                {/* Title */}
                <Skeleton className="my-1! h-8 w-2/3 sm:h-9.5 md:h-11" />
                {/* Date */}
                <Skeleton className="my-1! h-4.5 w-24" />
            </PassageHeader>

            {Array.from({ length }).map((_, index) => (
                <div key={index} className="mb-6 flex flex-col gap-2 *:h-5">
                    <Skeleton className="mr-7" />
                    <Skeleton className="mr-0" />
                    <Skeleton className="mr-4" />
                    <Skeleton className="w-3/4" />
                </div>
            ))}
        </Passage>
    )
}

export default BlogPostSkeleton
