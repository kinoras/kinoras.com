'use client'

import { Children, memo, useEffect, useState } from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const RotatingWords = ({
    delay = 0,
    interval = 750,
    speed = 400,
    children,
    className,
    ...restProps
}: ComponentProps<'span'> & {
    /** Initial delay before rotation starts (in milliseconds). Default: 0. */
    delay?: number
    /** Time between word transitions (in milliseconds). Default: 750. */
    interval?: number
    /** Animation speed for transition effects (in milliseconds). Default: 400. */
    speed?: number
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [completed, setCompleted] = useState(false)

    // Start rotation after the specified delay
    useEffect(() => {
        const delayTimer = setTimeout(() => setIsReady(true), delay)
        return () => clearTimeout(delayTimer)
    }, [delay])

    // Handle rotating through words at the specified interval
    useEffect(() => {
        // Do not rotate until the initial delay has passed
        if (!isReady) return

        // Do not rotate if there are not enough sets of words to rotate
        if (Children.count(children) < 2) return

        // Stop at the last word if all words have already been shown
        if (completed) return

        const rotateInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (prevIndex === Children.count(children) - 2)
                    setCompleted(true)
                return prevIndex + 1
            })
        }, interval)

        return () => clearInterval(rotateInterval)
    }, [isReady, completed, children, interval])

    return (
        <span
            className={cn(
                'relative inline-block h-[1lh] overflow-hidden align-bottom',
                className
            )}
            {...restProps}
        >
            {Children.toArray(children).map((child, index) => (
                <span
                    key={index}
                    className={cn(
                        'absolute transition-all',
                        index < currentIndex && '-translate-y-full select-none', // Previous
                        index > currentIndex && 'translate-y-full select-none' // Upcoming
                    )}
                    style={{ transitionDuration: `${speed}ms` }}
                >
                    {child}
                </span>
            ))}
        </span>
    )
}

export default memo(RotatingWords)
