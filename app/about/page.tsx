import { Metadata } from 'next'

import { IconUserSquareRounded } from '@tabler/icons-react'

import {
    Banner,
    BannerBar,
    BannerContent,
    BannerIconBackground,
    BannerTitle
} from '@/components/ui/banner'
import { Section, SectionSeparator, SectionTitle } from '@/components/ui/section'
import { Timeline, TimelineIcon, TimelineItem } from '@/components/ui/timeline'

import { interests } from '@/data/about-interests'
import { tags } from '@/data/about-profile'
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
                <SectionTitle className="-ml-px">Tags</SectionTitle>
                <Timeline>
                    {tags.map(({ icon, title, description }, index) => (
                        <TimelineItem variant="clear" key={index}>
                            <TimelineIcon className="rounded-xl">{icon}</TimelineIcon>
                            <h3 className="mt-px text-lg font-medium sm:text-xl">{title}</h3>
                            <p className="text-secondary">{description}</p>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Section>

            <SectionSeparator />

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

            <SectionSeparator />

            <Section>
                <SectionTitle>Interests</SectionTitle>
                <Timeline>
                    {interests.map(({ icon, name, items }) => (
                        <TimelineItem variant="inclusive" key={name}>
                            <TimelineIcon className="rounded-xl">{icon}</TimelineIcon>
                            <h3 className="mt-px text-lg font-medium sm:text-xl">{name}</h3>
                            <ul className="text-secondary leading-snug!">
                                {items.map((item, index) => (
                                    <li
                                        className="mt-0.5 not-last:mb-1.5 after:opacity-50 sm:inline sm:not-last:after:content-['_/_']"
                                        key={index}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Section>
        </main>
    )
}

export default AboutPage
