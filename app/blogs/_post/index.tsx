import { FeedList, FeedSection } from '@/components/ui/feed'

import { getPosts } from '@/integrations/notion/posts'

import BlogsPostEntry from './entry'

const BlogsPosts = async () => {
    const { data: posts } = await getPosts()

    return (
        <FeedSection>
            <FeedList>
                {posts.map((post) => (
                    <BlogsPostEntry key={post.id} post={post} />
                ))}
            </FeedList>
        </FeedSection>
    )
}

export default BlogsPosts
