import { memo } from 'react'

import RotatingWords from '@/components/custom/rotating-words'
import { Banner, BannerContent, BannerDescription, BannerTitle } from '@/components/ui/banner'

const HomeBanner = () => {
    return (
        <Banner className="bg-theme/10 transition-all">
            <BannerContent>
                <BannerTitle className="text-[min(11vw,_48px)] whitespace-nowrap transition-all duration-400">
                    Hello,
                    <br />
                    I&nbsp;
                    <RotatingWords className="w-full" delay={150}>
                        <span>am from Macau.</span>
                        <span>listen to J-pop.</span>
                        <span>studied in NTU.</span>
                        <span>make websites.</span>
                        <span>
                            am&nbsp;
                            <b className="text-theme font-semibold">kinoRAS</b>.
                        </span>
                    </RotatingWords>
                </BannerTitle>
                <BannerDescription className="w-11/12 max-w-3xl md:text-balance">
                    A full-stack developer with expertise in React&nbsp;and&nbsp;Express, with
                    experience in Vue,&nbsp;PHP&nbsp;and&nbsp;database.
                </BannerDescription>
            </BannerContent>
        </Banner>
    )
}

export default memo(HomeBanner)
