import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const HomeAnchor = () => {
    return (
        <Link
            href="/"
            className={cn(
                '-ms-3 p-3', // Layout
                'transition-all duration-400', // Animation
                'drop-shadow-[0_0_12px] drop-shadow-transparent hover:drop-shadow-sky-400/75' // Hovering style
            )}
        >
            <Image
                src="/kinoras.svg"
                className="ml-px"
                width={24}
                height={24}
                alt="kinoRAS"
            />
        </Link>
    )
}

export default HomeAnchor
