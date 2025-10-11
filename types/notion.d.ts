import type { PageObjectResponse, RichTextItemResponse } from '@notionhq/client'

// Page types
export type NotionPageProperty = PageObjectResponse['properties'][string]
export type NotionPageProperties = {
    [K in NotionPageProperty['type']]: Extract<NotionPageProperty, { type: K }>
}

// Page response entry with custom properties
export type NotionPageEntry<TProperties extends Record<string, NotionPageProperty>> = Omit<
    PageObjectResponse,
    'properties'
> & {
    properties: Partial<TProperties>
}

// Specific property types
export type NotionPageId = PageObjectResponse['id'] // Page-level
export type NotionPageIcon = PageObjectResponse['icon']
export type NotionPageTitle = NotionPageProperties['title'] // Property-level
export type NotionPageFiles = NotionPageProperties['files']
export type NotionPageRichText = NotionPageProperties['rich_text']
export type NotionPageSelect = NotionPageProperties['select']
export type NotionPageStatus = NotionPageProperties['status']
export type NotionPageMultiSelect = NotionPageProperties['multi_select']
export type NotionPageURL = NotionPageProperties['url']
export type NotionPageNumber = NotionPageProperties['number']
export type NotionPageUniqueId = NotionPageProperties['unique_id']
export type NotionPageDate = NotionPageProperties['date']

// Data types
export type NotionRichText = RichTextItemResponse
export type NotionFile = NotionPageFiles['files'][number]
export type NotionSelect = NonNullable<NotionPageSelect['select']>
export type NotionSelectColor = NotionSelect['color']
