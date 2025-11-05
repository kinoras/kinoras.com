import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Section = ({ className, children, ...props }: ComponentProps<'section'>) => {
    return (
        <section
            data-slot="section"
            className={cn('wrapper', 'my-6 sm:my-8', className)}
            {...props}
        >
            <div data-slot="section-container" className="container">
                {children}
            </div>
        </section>
    )
}

const SectionTitle = ({ className, ...props }: ComponentProps<'h2'>) => {
    return (
        <h2
            data-slot="section-title"
            className={cn(
                'mb-7 text-3xl font-medium tracking-tight sm:mb-8 sm:text-4xl',
                className
            )}
            {...props}
        />
    )
}

export { Section, SectionTitle }
