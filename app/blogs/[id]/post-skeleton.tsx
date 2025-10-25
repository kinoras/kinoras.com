import { Passage, PassageHeader } from '@/components/ui/passage'
import { Skeleton } from '@/components/ui/skeleton'

const BlogPostSkeleton = ({ length = 3 }: { length?: number }) => {
    return (
        <Passage>
            <PassageHeader>
                {/* Breadcrumb · Date */}
                <Skeleton className="my-1! h-4.5 w-36" />
                {/* Title */}
                <Skeleton className="my-1! h-8 w-2/3 sm:h-9.5 md:h-11" />
                {/* Description */}
                <Skeleton className="my-1! h-4.5 w-4/5" />
                {/* Project */}
                <Skeleton className="h-6.5 w-38" />
            </PassageHeader>

            {/* Content */}
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
