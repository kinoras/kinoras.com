import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { File } from '@/types/common'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const notNull = <T>(value: T): value is NonNullable<T> => {
    return value != null
}

export const isFile = (value: unknown): value is File => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'url' in value &&
        typeof value.url === 'string'
    )
}
