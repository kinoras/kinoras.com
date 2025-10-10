import 'server-only'

import type { PostService } from '@/types/post'

import { getPostList } from './get-list'

export const DATASOURCE_ID = process.env.NOTION_DATASOURCE_ID

export const Post: PostService = {
    getList: getPostList
}
