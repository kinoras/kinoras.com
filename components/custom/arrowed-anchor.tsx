import type { ComponentProps } from 'react'

import { IconArrowUpRight } from '@tabler/icons-react'

import { Anchor } from '@/components/ui/typography'

const ArrowedAnchor = ({ children, ...restProps }: ComponentProps<typeof Anchor>) => {
    return (
        <Anchor styled={false} {...restProps}>
            {children}
            <IconArrowUpRight
                className="text-primary -mr-0.5 -ml-px inline size-[.875em] -translate-y-7/24 opacity-50"
                strokeWidth={2}
            />
        </Anchor>
    )
}

export default ArrowedAnchor
