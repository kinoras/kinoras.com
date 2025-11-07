import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Input = ({ className, type, ...props }: ComponentProps<'input'>) => {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
                'placeholder:text-tertiary selection:bg-primary selection:text-background dark:bg-accent/30 border-accent bg-transparent', // Colors
                'file:text-primary file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium', // File upload
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50', // Disabled
                'focus-visible:border-border focus-visible:ring-border/50 focus-visible:ring-[3px]', // Focus
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', // Invalid
                className
            )}
            {...props}
        />
    )
}

export { Input }
