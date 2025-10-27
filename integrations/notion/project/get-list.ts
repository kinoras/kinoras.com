import 'server-only'

import { isFullPage } from '@notionhq/client'

import { notion } from '@/integrations/notion/client'

import type { ProjectListQueryOptions } from '@/types/project'

import { PROJECTS_DATASOURCE_ID, notionPageToProject } from './utils'

/**
 * Queries a list of projects from the Notion data source.
 *
 * @param options - Query parameters.
 * @returns Promise that resolves to an object containing the list of projects and the next cursor.
 */
export const getProjectList = async ({
    category,
    limit = 100,
    cursor
}: Partial<ProjectListQueryOptions> = {}) => {
    try {
        // Retrieve projects
        const { results, next_cursor } = await notion.dataSources.query({
            data_source_id: PROJECTS_DATASOURCE_ID!,
            filter: category
                ? { property: 'Category', select: { equals: category } } // Query only the specified category
                : undefined,
            start_cursor: cursor,
            page_size: limit
        })

        // Process results
        const projects = results
            .filter(isFullPage) // Mainly for ensuring type safety
            .map(notionPageToProject)

        return {
            projects,
            nextCursor: next_cursor
        }
    } catch (error) {
        return {
            projects: [],
            nextCursor: null
        }
    }
}
