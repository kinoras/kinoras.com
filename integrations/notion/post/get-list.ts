import 'server-only'

import { isFullPage } from '@notionhq/client'
import dayjs from 'dayjs'

import { notion } from '@/integrations/notion/client'
import { PropertyExtractor } from '@/integrations/notion/extractors'
import type { PostData, PostService } from '@/types/post'

import { DATASOURCE_ID } from './index'
import type { NotionPostPage } from './type'

export const getPostList: PostService['getList'] = async ({
    order = 'descending',
    limit = 100,
    cursor
} = {}) => {
    // Retrieve posts
    const { results, next_cursor } = await notion.dataSources.query({
        data_source_id: DATASOURCE_ID!,
        filter: { property: 'Status', status: { equals: 'Public' } }, // Query only public posts
        sorts: [{ property: 'Date', direction: order }],
        start_cursor: cursor,
        page_size: limit
    })

    // Process results
    const posts = results
        .filter(isFullPage) // Mainly for ensuring type safety
        .map(notionPagetoPost)

    return { posts, nextCursor: next_cursor }
}

// Convert notion page response object to page-data entry
const notionPagetoPost = (notionPage: NotionPostPage): PostData => {
    // Extract properties
    const { icon, created_time, properties } = notionPage
    const { ID, Cover, Title, Description, Tags, Project, Date } = properties

    // Extract notion properties
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
