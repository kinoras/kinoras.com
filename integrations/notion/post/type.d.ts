import type {
    NotionPageDate,
    NotionPageEntry,
    NotionPageFiles,
    NotionPageMultiSelect,
    NotionPageRichText,
    NotionPageTitle,
    NotionPageUniqueId
} from '@/types/notion'

// Post-data entry: Notion storage properties
type NotionPostProperties = {
    ID: NotionPageUniqueId
    Cover: NotionPageFiles
    Title: NotionPageTitle
    Description: NotionPageRichText
    Tags: NotionPageMultiSelect
    Project: NotionPageRichText
    Date: NotionPageDate
}

// Post-data entry: Notion page type
export type NotionPostPage = NotionPageEntry<NotionPostProperties>
