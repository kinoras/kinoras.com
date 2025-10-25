import { Suspense } from 'react'

import { Metadata } from 'next'

import { IconMessage } from '@tabler/icons-react'

import {
    Banner,
    BannerContent,
    BannerDescription,
    BannerIconBackground,
    BannerTitle
} from '@/components/ui/banner'

import BlogsPosts from './posts'
import BlogsPostSkeleton from './posts-skeleton'

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'I document the development process of my projects here.',
}

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
                <BannerIconBackground className="hidden sm:block" icon={IconMessage} />
            </Banner>
            <Suspense fallback={<BlogsPostSkeleton length={2} />}>
                <BlogsPosts />
            </Suspense>
        </main>
    )
}

export const dynamic = 'force-dynamic'

export default BlogsPage
