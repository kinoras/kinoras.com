import type { ComponentProps } from 'react'

import { Anchor } from '@/components/ui/typography'

import { cn } from '@/lib/utils'

import { links } from '@/data/footer-links'

const PageFooter = ({ className, ...props }: ComponentProps<'footer'>) => {
    return (
        <footer className={cn('wrapper border-border mt-6 border-t', className)} {...props}>
            <div className="container">
                <div className="flex items-center justify-between py-6">
                    <span className="text-secondary">© 2025 kinoRAS</span>
                    <ul className="flex items-center gap-5 sm:gap-5">
                        {links.map(({ icon: LinkIcon, href, title }) => (
                            <li key={href}>
                                <Anchor
                                    href={href}
                                    styled={false}
                                    className="[&>svg]:opacity-55 hover:[&>svg]:opacity-100"
                                >
                                    <LinkIcon
                                        className="size-5 transition-opacity"
                                        strokeWidth={1.5}
                                    />
                                    <span className="sr-only">{title}</span>
                                </Anchor>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default PageFooter
