import React from 'react'
import {getGQLClient} from '../gql/request'
import {ALL_POSTS, TAG_POSTS} from '../gql/posts'
import {FEATURED_AUTHOR} from '../gql/authors'
import GridLayout from '../components/pages/home/gridLayout'
import {FEATURED_TAGS} from '../gql/tags'
import FeaturedTags from '../components/pages/home/featuredTags'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../helpers/contants'

export const PostsContext = React.createContext<any>({})

const Home = (props) => {
  return (
    <PostsContext.Provider value={props}>
      <Helmet title={siteTitle} />

      <GridLayout>
        <FeaturedTags />
      </GridLayout>
    </PostsContext.Provider>
  )
}

export const getStaticProps = async () => {
  const client = getGQLClient()
  const postsData: any = await client.request(ALL_POSTS, {limit: 4})
  const authorData: any = await client.request(FEATURED_AUTHOR)
  const featuredTagsData: any = await client.request(FEATURED_TAGS)

  for (const tag of featuredTagsData.tags) {
    const posts: any = await client.request(TAG_POSTS, {
      limit: 4,
      tagId: tag.id,
    })

    tag.posts = posts.posts
  }

  return {
    props: {
      featuredTags: featuredTagsData.tags,
      posts: postsData.posts,
      author: authorData.authors[0],
    },
  }
}

export default Home
