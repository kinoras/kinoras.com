import dayjs from 'dayjs'

import type { Anchor, File, Option } from '@/types/common'
import type {
    NotionFile,
    NotionPageIcon,
    NotionPageProperty,
    NotionRichText,
    NotionSelect
} from '@/types/notion'

import { COLOR_MAP } from './consts'

export class PropertyExtractor {
    // String...
    static title(prop?: NotionPageProperty): string | null {
        if (prop?.type !== 'title') return null
        return flattenRichText(prop.title)
    }

    static richText(prop?: NotionPageProperty): string | null {
        if (prop?.type !== 'rich_text') return null
        // TODO: add markdown support
        return flattenRichText(prop.rich_text)
    }

    static url(prop?: NotionPageProperty): Anchor | null {
        if (prop?.type !== 'url' || !prop.url) return null
        return { href: prop.url }
    }

    static emoji(icon?: NotionPageIcon): string | null {
        if (!icon || icon.type !== 'emoji') return null
        return icon.emoji
    }

    // Media...
    static files(prop?: NotionPageProperty): File[] {
        if (prop?.type !== 'files') return []
        return prop.files
            .map(normalizeFile) // Convert to the unified structure
            .filter((file): file is File => file !== null) // Remove the invalid ones
    }

    static icon(icon?: NotionPageIcon): string | File | null {
        if (!icon) return null
        switch (icon.type) {
            case 'emoji':
                return icon.emoji // Consider `emoji()` for unicode emoji only
            case 'file':
                return normalizeFile({
                    type: 'file',
                    name: icon.file.url,
                    file: icon.file
                })
            case 'external':
                return normalizeFile({
                    type: 'external',
                    name: icon.external.url,
                    external: icon.external
                })
            case 'custom_emoji':
                return {
                    name: icon.custom_emoji.name,
                    url: icon.custom_emoji.url
                }
        }
    }

    // Options...
    static multiSelect(prop?: NotionPageProperty): Option[] {
        if (prop?.type !== 'multi_select') return []
        return prop.multi_select.map(processSelect)
    }

    static status(prop?: NotionPageProperty): Option | null {
        if (prop?.type !== 'status' || !prop.status) return null
        return processSelect(prop.status)
    }

    // Number...
    static number(prop?: NotionPageProperty): number | null {
        switch (prop?.type) {
            case 'number':
                return prop.number
            case 'unique_id':
                return prop.unique_id.number // Return the numeric part
            case 'date':
            case 'created_time':
            case 'last_edited_time':
                return null // Should use `date()` instead
            default:
                return null
        }
    }

    // Date...
    static date(prop?: NotionPageProperty): number | null {
        switch (prop?.type) {
            case 'created_time':
                return dayjs(prop.created_time).unix()
            case 'last_edited_time':
                return dayjs(prop.last_edited_time).unix()
            case 'date':
                return prop.date ? dayjs(prop.date.start).unix() : null
            default:
                return null
        }
    }
}

// Utility functions

const flattenRichText = (rich: NotionRichText[]): string => {
    return rich.map(({ plain_text }) => plain_text).join('')
}

const normalizeFile = (file: NotionFile): File | null => {
    switch (file.type) {
        case 'external':
            return {
                name: file.name,
                url: file.external.url
            }
        case 'file':
            return {
                name: file.name,
                url: file.file.url,
                expiry: dayjs(file.file.expiry_time).unix()
            }
        default:
            return null
    }
}

const processSelect = (select: NotionSelect): Option => {
    return {
        name: select.name,
        color: COLOR_MAP[select.color]
    }
}
