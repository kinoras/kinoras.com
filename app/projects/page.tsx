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

import { ProjectsFeed, ProjectsFeedList } from './feed'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'I document the development process of my projects here.'
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
                <Suspense fallback={<div>loading</div>}>
                    <ProjectsFeedList category="Personal" showItemAvatar={false} />
                </Suspense>
            </ProjectsFeed>

            <ProjectsFeed>
                <h2>Course</h2>
                <Suspense fallback={<div>loading</div>}>
                    <ProjectsFeedList category="Course" />
                </Suspense>
            </ProjectsFeed>
        </main>
    )
}

export const dynamic = 'force-dynamic'

export default ProjectsPage
