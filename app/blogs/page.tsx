import { Suspense } from 'react'

import { IconMessage } from '@tabler/icons-react'

import {
    Banner,
    BannerContent,
    BannerDescription,
    BannerIconBackground,
    BannerTitle
} from '@/components/ui/banner'

import BlogsPosts from './_post'
import BlogsPostSkeleton from './_post/skeleton'

const BlogsPage = () => {
    return (
        <main>
            <Banner className="bg-theme/15">
                <BannerContent>
                    <BannerTitle className="mb-1 -ml-[2px] text-5xl sm:mb-0 md:-ml-[3px]">
                        Blogs
                    </BannerTitle>
                    <BannerDescription className="text-lg text-balance sm:max-w-2/3">
                        I document the development process of my projects here.
                    </BannerDescription>
                </BannerContent>
                <BannerIconBackground
                    className="hidden sm:block"
                    icon={IconMessage}
                />
            </Banner>
            <Suspense fallback={<BlogsPostSkeleton length={2} />}>
                <BlogsPosts />
            </Suspense>
        </main>
    )
}

export default BlogsPage
