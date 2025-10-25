import 'server-only'

import { type PageObjectResponse, isFullPage } from '@notionhq/client'
import dayjs from 'dayjs'

import { PropertyExtractor } from '@/integrations/notion/extractors'
import type { PostData, PostId } from '@/types/post'

import { notion } from '../client'
import { DATASOURCE_ID } from './index'
import type { NotionPostPage } from './type'

/**
 * Convert notion page response object to page-data entry.
 *
 * @param notionPage - The original page object from the Notion API response.
 * @returns A converted page data entry.
 */
export const notionPageToPost = (notionPage: NotionPostPage): PostData => {
    const { icon, created_time, properties } = notionPage
    const { ID, Cover, Title, Description, Tags, Project, Date } = properties

    return {
        id: PropertyExtractor.number(ID)!,
        icon: PropertyExtractor.emoji(icon),
        cover: PropertyExtractor.files(Cover)[0] ?? null,
        title: PropertyExtractor.title(Title),
        description: PropertyExtractor.richText(Description),
        tags: PropertyExtractor.multiSelect(Tags),
        project: PropertyExtractor.richText(Project),
        publishAt: PropertyExtractor.date(Date) ?? dayjs(created_time).unix()
    }
}

/**
 * Finds a Notion page by its post ID.
 *
 * @param postId - The PostId of the post.
 * @returns A promise that resolves to the Notion page object if found, or null if the post is not found or incomplete.
 */
export const findPageWithPostId = async (
    postId: PostId
): Promise<PageObjectResponse | null> => {
    const { results } = await notion.dataSources.query({
        data_source_id: DATASOURCE_ID!,
        filter: {
            and: [
                { property: 'ID', unique_id: { equals: postId } }, // Search with the ID field
                { property: 'Status', status: { equals: 'Public' } } // Query only public posts
            ]
        }
    })

    if (!results[0] || !isFullPage(results[0])) {
        return null
    }

    return results[0]
}
