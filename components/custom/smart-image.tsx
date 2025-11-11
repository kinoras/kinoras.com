'use client'

import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'

import Image from 'next/image'

const SmartImage = ({
    /** Fallback src if the main src fails to load. */
    fallback,
    src,
    ...restProps
}: ComponentProps<typeof Image> & {
    fallback?: typeof src
}) => {
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        setError(false)
    }, [src])

    return (
        <Image
            src={error && fallback ? fallback : src} // Show fallback on src load error if provided
            onError={() => setError(true)}
            {...restProps}
        />
    )
}

export default SmartImage
