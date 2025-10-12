import 'server-only'

import type { PostService } from '@/types/post'

import { getPostContent } from './get-content'
import { getPostList } from './get-list'
import { getSinglePost } from './get-single'

export const DATASOURCE_ID = process.env.NOTION_DATASOURCE_ID

export const Post: PostService = {
    getList: getPostList,
    getSingle: getSinglePost,
    getContent: getPostContent
}
