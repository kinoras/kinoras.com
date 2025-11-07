import 'server-only'

import { unstable_cache } from 'next/cache'

import dayjs from 'dayjs'

import { notNull } from '@/lib/utils'

import { getRepositoryInfo } from '@/integrations/github/repository'
import { getProjectList } from '@/integrations/notion/project/get-list'
import type { PartialProjectData } from '@/integrations/notion/project/utils'

import type { ProjectData, ProjectService } from '@/types/project'

export const Project: ProjectService = {
    getList: (options) =>
        unstable_cache(
            async () => {
                try {
                    // Retrieve projects from Notion
                    const { projects, nextCursor } = await getProjectList(options)

                    // Fetch repository properties from GitHub
                    const hydratedProjects = (await Promise.all(projects.map(hydrateProject)))
                        .filter(notNull) // Exclude non-hydratable items
                        .toSorted((a, b) => dayjs(b._date).unix() - dayjs(a._date).unix()) // Sort by creation date (newest first)
                        .map(({ _date, ...proj }) => proj) // Remove the sorting helper property

                    return {
                        projects: hydratedProjects,
                        nextCursor
                    }
                } catch (error) {
                    return { projects: [], nextCursor: null }
                }
            }, // Fetcher
            ['projects', JSON.stringify(options || {})], // Key
            { revalidate: 3600, tags: ['projects'] } // TTL (1 hour) & tags
        )()
}

const hydrateProject = async (
    project: PartialProjectData
): Promise<(ProjectData & { _date: string }) | null> => {
    // Validate project content
    if (!project.repository) return null

    // Get repository info from GitHub API
    const repository = await getRepositoryInfo(project.repository)
    if (!repository) return null

    // Map the fields
    return {
        hero: project.hero,
        name: project.name,
        description: project.description || repository.description,
        tags: repository.topics,
        repository: {
            name: repository.full_name,
            owner: {
                name: repository.owner.login,
                avatar: repository.owner.avatar_url
            },
            url: repository.html_url
        },
        deployment: repository.homepage,
        _date: repository.created_at
    }
}
