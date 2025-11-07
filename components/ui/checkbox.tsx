'use client'

import type { ComponentProps } from 'react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { IconCheck } from '@tabler/icons-react'

import { cn } from '@/lib/utils'

const Checkbox = ({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) => {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                'peer border-accent dark:bg-accent/30 size-4 shrink-0 rounded-sm border shadow-xs transition-shadow outline-none',
                'focus-visible:ring-border/50 focus-visible:ring-[3px]', // Focus
                'aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger', // Invalid
                'data-[state=checked]:bg-primary data-[state=checked]:text-background dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary', // Checked
                'disabled:cursor-not-allowed disabled:opacity-50', // Disabled
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="grid place-content-center text-current transition-none"
            >
                <IconCheck className="size-3.5" stroke={3} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}

export { Checkbox }
