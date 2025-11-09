import { Suspense } from 'react'

import { Metadata } from 'next'

import { IconMessage } from '@tabler/icons-react'

import {
    Banner,
    BannerBar,
    BannerContent,
    BannerIconBackground,
    BannerTitle
} from '@/components/ui/banner'
import { Section } from '@/components/ui/section'

import BlogsPosts from './posts'
import BlogsPostSkeleton from './posts-skeleton'

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'I document the development process of my projects here.'
}

const BlogsPage = () => {
    return (
        <main>
            <Banner>
                <BannerContent>
                    <BannerTitle className="mb-1 -ml-0.5 text-5xl sm:mb-0 md:-ml-[3px]">
                        Blogs
                    </BannerTitle>
                    <BannerBar />
                </BannerContent>
                <BannerIconBackground
                    className="hidden sm:block"
                    stroke={0.5}
                    opacity={0.15}
                    icon={IconMessage}
                />
            </Banner>
            <Section className="my-0!">
                <Suspense fallback={<BlogsPostSkeleton length={2} />}>
                    <BlogsPosts />
                </Suspense>
            </Section>
        </main>
    )
}

export default BlogsPage
