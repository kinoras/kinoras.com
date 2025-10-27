import 'server-only'

// import { unstable_cache } from 'next/cache'

import { getProjectList } from '@/integrations/notion/project/get-list'

import type { ProjectService } from '@/types/project'

export const Project: ProjectService = {
    getList: async (options) => {
        const { projects, nextCursor } = await getProjectList(options)
        return {
            projects: projects,
            nextCursor
        }
    }
}
