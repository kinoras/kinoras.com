import { PassageBody } from '@/components/ui/passage'
import { Section, SectionTitle } from '@/components/ui/section'

import { profile } from '@/data/about-profile'

import Banner from './banner'
import { HighlightedStrong, HomeParagraph } from './components'

export default function Home() {
    return (
        <main>
            <Banner />

            <Section>
                <SectionTitle>About me</SectionTitle>
                <article>
                    <PassageBody
                        content={profile}
                        maps={{
                            p: (props) => <HomeParagraph {...props} />,
                            strong: (props) => <HighlightedStrong {...props} />
                        }}
                    />
                </article>
            </Section>
        </main>
    )
}
