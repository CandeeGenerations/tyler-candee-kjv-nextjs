import Layout from '../components/layout'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../helpers/contants'
import React, {useEffect, useState} from 'react'
import Headings from '../components/postComponents/headings'
import ButtonLink from '../components/buttonLink'
import {getGQLClient} from '../gql/request'
import {TODAYS_POSTS} from '../gql/posts'
import HomePosts from '../components/pages/home/posts'
import H1 from '../components/typography/heading1'
import styled from '@emotion/styled'
import Post from '../components/pages/home/post'

const Today = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const getTodaysPosts = async () => {
    const client = getGQLClient()
    const postsData: any = await client.request(TODAYS_POSTS)

    setPosts(postsData.todaysPosts)
    setLoading(false)
  }

  useEffect(() => {
    getTodaysPosts()
  }, [])

  return (
    <Layout>
      <Helmet title={`Today's Posts | ${siteTitle}`} />

      <div className="relative flex flex-col items-center justify-center lg:px-0 px-4 mt-32 mb-16">
        <H1 size="4xl">Today's Posts</H1>
      </div>

      <PostsWrapper className="rounded-lg py-20 lg:px-24 px-4 relative">
        {loading ? (
          <p className="text-center italic">Loading...</p>
        ) : posts.length === 0 ? (
          <div className="text-center">
            <p className="italic mb-6">
              Looks like there are no posts for today.
            </p>

            <div className="py-10">
              <ButtonLink href="/">Go Home</ButtonLink>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 mb-16">
            {posts.map((post) => (
              <Post key={post.id} data={post} />
            ))}
          </div>
        )}
      </PostsWrapper>
    </Layout>
  )
}

const PostsWrapper = styled.div`
  z-index: 1;
  background: linear-gradient(180deg, #fff 0%, rgba(249, 250, 252, 0) 91.01%);
`

export default Today
