import { cacheLife, cacheTag } from 'next/cache'

import type { RepositoryResponse } from './response'

export const getRepositoryInfo = async (
    repository: string
): Promise<RepositoryResponse | null> => {
    'use cache'
    cacheLife('days')
    cacheTag('projects', 'projects-github')

    try {
        const response = await fetch(`https://api.github.com/repos/${repository}`, {
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch repository info (${response.status})`)
        }

        return await response.json()
    } catch (error) {
        return null
    }
}
