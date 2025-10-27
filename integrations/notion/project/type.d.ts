import type { NotionPageRichText, NotionPageSelect, NotionPageTitle } from '@/types/notion'

// Project entry: Notion storage properties
type NotionProjectProperties = {
    Name: NotionPageTitle
    Description: NotionPageRichText
    Repository: NotionPageRichText
    Category: NotionPageSelect
}

// Project entry: Notion page type
export type NotionProjectPage = NotionPageEntry<NotionProjectProperties>
