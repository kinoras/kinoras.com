import 'server-only'

import { PropertyExtractor } from '@/integrations/notion/extractors'

import type { ProjectData } from '@/types/project'

import type { NotionProjectPage } from './type'

export const PROJECTS_DATASOURCE_ID = process.env.NOTION_PROJECTS_DATASOURCE_ID

export type PartialProjectData = Pick<ProjectData, 'hero' | 'name' | 'description'> & {
    /* Repository full name of the project. */
    repository: string | null
}

/**
 * Converts a Notion page entry to a PartialProjectData object.
 *
 * @param notionPage - The original page object from the Notion API response.
 * @returns A converted PartialProjectData object.
 */
export const notionPageToProject = (notionPage: NotionProjectPage): PartialProjectData => {
    const { icon, properties } = notionPage
    const { Name, Description, Repository } = properties

    return {
        hero: PropertyExtractor.icon(icon),
        name: PropertyExtractor.title(Name) ?? '',
        description: PropertyExtractor.richText(Description),
        repository: PropertyExtractor.richText(Repository)
    }
}
