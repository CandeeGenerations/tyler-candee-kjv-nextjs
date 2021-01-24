import React from 'react'
import PostsPage from '../../components/pages/posts/postsPage'
import {getGQLClient} from '../../gql/request'
import {ALL_POSTS, POSTS_COUNT} from '../../gql/posts'
import {FEATURED_AUTHOR} from '../../gql/authors'
import GridLayout from '../../components/pages/home/gridLayout'
import {PostsContext} from '../index'

const Posts = (props) => {
  return (
    <PostsContext.Provider value={props}>
      <GridLayout>
        <PostsPage />
      </GridLayout>
    </PostsContext.Provider>
  )
}

export const getStaticProps = async () => {
  const client = getGQLClient()
  const postsData = await client.request(ALL_POSTS)
  const postsCountData = await client.request(POSTS_COUNT)
  const authorData = await client.request(FEATURED_AUTHOR)

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
