import 'server-only'

import dayjs from 'dayjs'

import { notNull } from '@/lib/utils'

import { getRepositoryInfo } from '@/integrations/github/repository'
import { getProjectList } from '@/integrations/notion/project/get-list'
import type { PartialProjectData } from '@/integrations/notion/project/utils'

import type { ProjectData, ProjectService } from '@/types/project'

export const Project: ProjectService = {
    getList: async (options) => {
        try {
            // Retrieve projects from Notion
            const { projects, nextCursor } = await getProjectList(options)

            // Fetch repository properties from GitHub
            const hydratedProjects = (await Promise.all(projects.map(hydrateProject)))
                .filter(notNull) // Exclude non-hydratable items
                .toSorted((a, b) => b.repository.createdAt - a.repository.createdAt) // Sort by creation date (newest first)

            return {
                projects: hydratedProjects,
                nextCursor
            }
        } catch {
            return { projects: [], nextCursor: null }
        }
    }
}

const hydrateProject = async (project: PartialProjectData): Promise<ProjectData | null> => {
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
            url: repository.html_url,
            createdAt: dayjs(repository.created_at).unix()
        },
        deployment: repository.homepage
    }
}
