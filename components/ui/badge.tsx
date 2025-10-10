import type { ComponentProps } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-sm font-base w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger transition-[color,box-shadow,background-color] overflow-hidden',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary [a&]:hover:bg-primary/90',
                secondary:
                    'border-transparent bg-float/50 dark:bg-float/75 text-primary [a&]:hover:bg-float',
                danger: 'border-transparent bg-danger text-white [a&]:hover:bg-danger/90 focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40 dark:bg-danger/60',
                outline:
                    'border-float text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

const Badge = ({
    className,
    variant,
    asChild = false,
    ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'span'

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    )
}

export { Badge, badgeVariants }
