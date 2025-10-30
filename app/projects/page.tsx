import { Suspense } from 'react'

import { Metadata } from 'next'

import { IconCode } from '@tabler/icons-react'

import {
    Banner,
    BannerBar,
    BannerContent,
    BannerIconBackground,
    BannerTitle
} from '@/components/ui/banner'
import { Separator } from '@/components/ui/separator'

import { ProjectsFeed, ProjectsFeedList } from './feed'
import { ProjectsFeedListSkeleton } from './feed-skeleton'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Here are the projects I have worked on and contributed to over time.'
}

const ProjectsPage = () => {
    return (
        <main>
            <Banner>
                <BannerContent>
                    <BannerTitle className="mb-1 -ml-[2px] text-5xl sm:mb-0 md:-ml-[3px]">
                        Projects
                    </BannerTitle>
                    <BannerBar />
                </BannerContent>
                <BannerIconBackground
                    className="hidden sm:block"
                    stroke={0.5}
                    opacity={0.15}
                    icon={IconCode}
                />
            </Banner>

            <ProjectsFeed>
                <h2>Personal</h2>
                <Suspense fallback={<ProjectsFeedListSkeleton length={2} />}>
                    <ProjectsFeedList category="Personal" showItemAvatar={false} />
                </Suspense>
            </ProjectsFeed>

            <div className="wrapper">
                <div className="container py-3 sm:py-4">
                    <Separator orientation="horizontal" />
                </div>
            </div>

            <ProjectsFeed>
                <h2>Course</h2>
                <Suspense fallback={<ProjectsFeedListSkeleton length={2} />}>
                    <ProjectsFeedList category="Course" />
                </Suspense>
            </ProjectsFeed>
        </main>
    )
}

export const dynamic = 'force-dynamic'

export default ProjectsPage
