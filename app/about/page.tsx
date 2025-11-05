import { Metadata } from 'next'

import { IconUserSquareRounded } from '@tabler/icons-react'

import {
    Banner,
    BannerBar,
    BannerContent,
    BannerIconBackground,
    BannerTitle
} from '@/components/ui/banner'
import { Section, SectionTitle } from '@/components/ui/section'
import { Timeline, TimelineIcon, TimelineItem } from '@/components/ui/timeline'

import { timeline } from '@/data/about-timeline'

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about kinoRAS here.'
}

const AboutPage = () => {
    return (
        <main>
            <Banner>
                <BannerContent>
                    <BannerTitle className="mb-1 text-5xl sm:mb-0">About</BannerTitle>
                    <BannerBar />
                </BannerContent>
                <BannerIconBackground
                    className="hidden sm:block"
                    stroke={0.5}
                    opacity={0.15}
                    icon={IconUserSquareRounded}
                />
            </Banner>

            <Section>
                <SectionTitle>Timeline</SectionTitle>
                <Timeline>
                    {timeline.map(({ icon, title, period, description }, index) => (
                        <TimelineItem key={index}>
                            {icon && <TimelineIcon>{icon}</TimelineIcon>}
                            <h3 className="mt-px text-lg font-medium sm:text-xl">{title}</h3>
                            <span className="text-secondary text-sm">{period}</span>
                            {description && <p className="text-secondary">{description}</p>}
                        </TimelineItem>
                    ))}
                </Timeline>
            </Section>
        </main>
    )
}

export default AboutPage
