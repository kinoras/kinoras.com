import { ComponentProps } from 'react'

import { DemoBadge, RepoBadge } from '@/components/custom/anchor-badges'
import {
    Feed,
    FeedDescription,
    FeedEntry,
    FeedList,
    FeedMedia,
    FeedTitle
} from '@/components/ui/feed'

import { cn, isFile } from '@/lib/utils'

import { Project } from '@/services/project'

// Export block styles for skeleton
export const blockStyles = {
    wrapper: 'grid grid-cols-1 gap-8 pt-7 sm:pt-8 md:grid-cols-2', // List container
    root: 'flex items-start gap-4 border-b-0! p-0!', // List entry
    meta: 'flex flex-1 flex-col gap-1 pb-1.5',
    media: {
        container: 'relative shrink-0',
        avatar: 'border-border absolute -right-2 -bottom-2 z-5 size-8 rounded-full border',
        hero: cn(
            'dark:bg-float/75 bg-float/50 border-border rounded-xl border sm:rounded-2xl', // Appearance
            'aspect-square size-20', // Layout
            '*:block *:text-center *:text-5xl *:leading-19.5' // Emoji
        )
    }
}

const ProjectsFeed = ({ className, ...restProps }: ComponentProps<typeof Feed>) => {
    return (
        <Feed
            className={cn(
                'my-5 sm:my-6', // Container
                '[&_h2]:text-3xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:sm:text-4xl', // Title
                className
            )}
            {...restProps}
        />
    )
}

const ProjectsFeedList = async ({
    category,
    showItemAvatar = true
}: ComponentProps<typeof Feed> & {
    /** The category of projects to query. */
    category: string
    /** Whether to display repository owner's avatar along the project's hero. */
    showItemAvatar?: boolean
}) => {
    const { projects } = await Project.getList({ category })
    return (
        <FeedList className={blockStyles.wrapper}>
            {projects.map(({ hero, name, description, repository, deployment }) => (
                <FeedEntry key={name} className={blockStyles.root}>
                    {/* Media block */}
                    <div className={blockStyles.media.container}>
                        {/* Project hero */}
                        <FeedMedia className={blockStyles.media.hero}>
                            {isFile(hero) ? <img src={hero.url} /> : <span>{hero}</span>}
                        </FeedMedia>
                        {/* Owner's avatar */}
                        {showItemAvatar && (
                            <img
                                className={blockStyles.media.avatar}
                                src={repository.owner.avatar}
                            />
                        )}
                    </div>

                    {/* Media block */}
                    <div className={blockStyles.meta}>
                        {/* Title */}
                        <FeedTitle className="line-clamp-1">{name}</FeedTitle>
                        {/* Description */}
                        <FeedDescription className="line-clamp-3 leading-snug!">
                            {description}
                        </FeedDescription>
                        {/* Links */}
                        <div className="mt-1.5 flex gap-2">
                            <RepoBadge repo={repository.name}>Source</RepoBadge>
                            {deployment && <DemoBadge href={deployment}>Demo</DemoBadge>}
                        </div>
                    </div>
                </FeedEntry>
            ))}
        </FeedList>
    )
}

export { ProjectsFeed, ProjectsFeedList }
