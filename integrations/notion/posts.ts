import 'server-only'

import { isFullPage } from '@notionhq/client'
import dayjs from 'dayjs'

import type {
    NotionPageDate,
    NotionPageEntry,
    NotionPageFiles,
    NotionPageMultiSelect,
    NotionPageRichText,
    NotionPageTitle,
    NotionPageURL,
    NotionPageUniqueId
} from '@/types/notion'
import type {
    Post,
    PostsQueryParameters,
    PostsQueryResponse
} from '@/types/post'

import { notion } from './client'
import { POST_DATASOURCE_ID } from './consts'
import { PropertyExtractor } from './extractors'

type NotionPostProperties = {
    ID: NotionPageUniqueId
    Cover: NotionPageFiles
    Title: NotionPageTitle
    Description: NotionPageRichText
    Tags: NotionPageMultiSelect
    Project: NotionPageURL
    Date: NotionPageDate
}

type NotionPostPage = NotionPageEntry<NotionPostProperties>

export const getPosts = async ({
    order = 'descending',
    limit = 100,
    cursor
}: Partial<PostsQueryParameters> = {}): Promise<PostsQueryResponse> => {
    // Retrieve posts
    const response = await notion.dataSources.query({
        data_source_id: POST_DATASOURCE_ID!,
        filter: { property: 'Status', status: { equals: 'Public' } }, // Query only public posts
        sorts: [{ property: 'Date', direction: order }],
        start_cursor: cursor,
        page_size: limit
    })

    // Process results
    const posts = response.results
        .filter(isFullPage) // Mainly for ensuring type safety
        .map(notionPagetoPost)

    return {
        data: posts,
        nextCursor: response.next_cursor
    }
}

const notionPagetoPost = (notionPage: NotionPostPage): Post => {
    const { created_time, properties } = notionPage
    const { ID, Cover, Title, Description, Tags, Project, Date } = properties

    return {
        id: PropertyExtractor.number(ID)!,
        cover: PropertyExtractor.files(Cover)[0],
        title: PropertyExtractor.title(Title) ?? '',
        description: PropertyExtractor.richText(Description) ?? '',
        tags: PropertyExtractor.multiSelect(Tags),
        project: PropertyExtractor.url(Project) ?? undefined,
        publishAt: PropertyExtractor.date(Date) ?? dayjs(created_time).unix()
    }
}
