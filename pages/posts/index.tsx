import React from 'react'
import PostsPage from '../../components/pages/posts/postsPage'
import {getGQLClient} from '../../gql/request'
import {ALL_POSTS, POSTS_COUNT} from '../../gql/posts'
import {FEATURED_AUTHOR} from '../../gql/authors'
import GridLayout from '../../components/pages/home/gridLayout'
import {PostsContext} from '../index'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'

const Posts = (props) => {
  return (
    <PostsContext.Provider value={props}>
      <Helmet title={`All Posts | ${siteTitle}`} />

      <GridLayout>
        <PostsPage />
      </GridLayout>
    </PostsContext.Provider>
  )
}

export const getStaticProps = async () => {
  const client = getGQLClient()
  const postsData: any = await client.request(ALL_POSTS)
  const postsCountData: any = await client.request(POSTS_COUNT)
  const authorData: any = await client.request(FEATURED_AUTHOR)

  return {
    props: {
      posts: postsData.posts,
      count: postsCountData.postsCount,
      page: 1,
      author: authorData.authors[0],
    },
  }
}

export default Posts
