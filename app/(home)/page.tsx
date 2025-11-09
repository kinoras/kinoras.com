import RotatingWords from '@/components/custom/rotating-words'
import { Banner, BannerBar, BannerContent, BannerTitle } from '@/components/ui/banner'
import { Section, SectionSeparator, SectionTitle } from '@/components/ui/section'

import { profile } from '@/data/about-profile'
import { rotatingWords } from '@/data/home-banner'
import { contact } from '@/data/home-contact'
import { work } from '@/data/home-work'

import { HomePassage } from './components'

export default function Home() {
    return (
        <main>
            <Banner className="transition-all">
                <BannerContent>
                    <BannerTitle className="text-[min(11vw,48px)] whitespace-nowrap transition-all duration-400">
                        Hello,
                        <br />
                        I&nbsp;
                        <RotatingWords className="w-full" delay={150}>
                            {...rotatingWords}
                            <span>
                                am <b className="text-theme font-medium">kinoRAS</b>.
                            </span>
                        </RotatingWords>
                    </BannerTitle>
                    <BannerBar />
                </BannerContent>
            </Banner>

            <Section>
                <SectionTitle>About me</SectionTitle>
                <article>
                    <HomePassage content={profile} />
                </article>
            </Section>

            <SectionSeparator />

            <Section>
                <SectionTitle>Words & work</SectionTitle>
                <article>
                    <HomePassage content={work} />
                </article>
            </Section>

            <SectionSeparator />

            <Section>
                <SectionTitle>Get in touch</SectionTitle>
                <article>
                    <HomePassage content={contact} />
                </article>
            </Section>
        </main>
    )
}
