import { PassageBody } from '@/components/ui/passage'
import { Section, SectionTitle } from '@/components/ui/section'

import { profile } from '@/data/about-profile'

import Banner from './banner'

export default function Home() {
    return (
        <main>
            <Banner />

            <Section>
                <SectionTitle>About me</SectionTitle>
                <article>
                    <PassageBody
                        className="sm:text-[17px] [&_p]:last-of-type:mb-1 md:[&_p]:mb-4 [&_strong]:bg-linear-to-b [&_strong]:from-transparent [&_strong]:from-65% [&_strong]:to-sky-400/20 [&_strong]:to-65% [&_strong]:px-0.5 [&_strong]:dark:to-sky-600/50"
                        content={profile}
                    />
                </article>
            </Section>
        </main>
    )
}
