import React from 'react'
import {getGQLClient} from '../gql/request'
import {NEXT_POSTS, POST_BY_SLUG, POST_SLUGS} from '../gql/posts'
import PostPage from '../components/pages/post/postPage'
import {COMMENTS_BY_POST} from '../gql/comments'

export const PostContext = React.createContext<any>({})

const Post = (props) => {
  return (
    <PostContext.Provider value={props}>
      <PostPage />
    </PostContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const postSlugs: any = await client.request(POST_SLUGS)
  let paths = []

  postSlugs.posts.forEach((post) => {
    paths.push({params: {slug: post.slug}})
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const client = getGQLClient()
  const postData: any = await client.request(POST_BY_SLUG, {
    slug: params.slug,
  })
  const post = postData.posts[0]
  const nextPostsData: any = await client.request(NEXT_POSTS, {id: post.id})
  const comments: any = await client.request(COMMENTS_BY_POST, {
    postId: post.id,
  })

  return {
    props: {
      post,
      nextPosts: nextPostsData.nextPosts,
      comments: prepComments(comments.commentsByPost),
    },
  }
}

const prepComments = (c) => {
  const commentsData = {}

  c.forEach((comment) => {
    if (!comment.reference_comment) {
      commentsData[comment.id] = {...comment, childComments: []}
    } else {
      commentsData[comment.reference_comment.id].childComments.push(comment)
    }
  })

  return {data: commentsData, keys: Object.keys(commentsData)}
}

export default Post
