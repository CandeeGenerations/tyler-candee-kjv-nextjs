import PostsPage from '../../../components/pages/posts/postsPage'
import {getGQLClient} from '../../../gql/request'
import {ALL_POSTS, POSTS_COUNT} from '../../../gql/posts'
import {FEATURED_AUTHOR} from '../../../gql/authors'
import React from 'react'
import {PostsContext} from '../../index'
import GridLayout from '../../../components/pages/home/gridLayout'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../../helpers/contants'

const Page = (props) => {
  return (
    <PostsContext.Provider value={props}>
      <Helmet title={`Page ${props.page} - All Posts | ${siteTitle}`} />

      <GridLayout>
        <PostsPage />
      </GridLayout>
    </PostsContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const postsCountData = await client.request(POSTS_COUNT)
  const pages = Math.ceil(postsCountData.postsCount / 6)
  const paths = []

  for (let i = 2; i <= pages; i++) {
    paths.push({params: {page: `${i}`}})
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const client = getGQLClient()
  const pageNumber = Number(params.page)
  const postsData = await client.request(ALL_POSTS, {
    start: (pageNumber - 1) * 6,
  })
  const postsCountData = await client.request(POSTS_COUNT)
  const authorData = await client.request(FEATURED_AUTHOR)

  return {
    props: {
      posts: postsData.posts,
      count: postsCountData.postsCount,
      page: pageNumber,
      author: authorData.authors[0],
    },
  }
}

export default Page
