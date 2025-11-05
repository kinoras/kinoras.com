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
import { Section, SectionTitle } from '@/components/ui/section'
import { Separator } from '@/components/ui/separator'

import ProjectsFeed from './feed'
import ProjectsFeedSkeleton from './feed-skeleton'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Here are the projects I have worked on and contributed to over time.'
}

const ProjectsPage = () => {
    return (
        <main>
            <Banner>
                <BannerContent>
                    <BannerTitle className="mb-1 -ml-0.5 text-5xl sm:mb-0 md:-ml-[3px]">
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

            <Section>
                <SectionTitle className="mb-1!">Personal</SectionTitle>
                <Suspense fallback={<ProjectsFeedSkeleton length={2} />}>
                    <ProjectsFeed category="Personal" showItemAvatar={false} />
                </Suspense>
            </Section>

            <Section className="my-0! py-3 sm:py-4">
                <Separator orientation="horizontal" />
            </Section>

            <Section>
                <SectionTitle className="mb-1!">Course</SectionTitle>
                <Suspense fallback={<ProjectsFeedSkeleton length={2} />}>
                    <ProjectsFeed category="Course" />
                </Suspense>
            </Section>
        </main>
    )
}

export const dynamic = 'force-dynamic'

export default ProjectsPage
