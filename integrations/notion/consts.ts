import type { Color } from '@/types/common'
import type { NotionSelectColor } from '@/types/notion'

export const COLOR_MAP: Record<NotionSelectColor, Color | undefined> = {
    // Change names...
    green: 'emerald',
    purple: 'violet',
    gray: 'base',
    // No color...
    default: undefined,
    brown: undefined,
    // Remain as-is...
    orange: 'orange',
    yellow: 'yellow',
    blue: 'blue',
    pink: 'pink',
    red: 'red'
} as const

export const POST_DATASOURCE_ID = process.env.NOTION_DATASOURCE_ID
