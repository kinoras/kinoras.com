import 'server-only'

import { getPostContent } from '@/integrations/notion/post/get-content'
import { getPostList } from '@/integrations/notion/post/get-list'
import { getSinglePost } from '@/integrations/notion/post/get-single'

import type { PostService } from '@/types/post'

export const Post: PostService = {
    getList: getPostList,
    getSingle: getSinglePost,
    getContent: getPostContent
}
