import dayjs from 'dayjs'

import type { Anchor, File, Option } from '@/types/common'
import type {
    NotionFile,
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

    // Media...
    static files(prop?: NotionPageProperty): File[] {
        if (prop?.type !== 'files') return []
        return prop.files
            .map(normalizeFile)
            .filter((file): file is File => file !== null)
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
