import React from 'react'
import Layout from '../../layout'
import Pagination from '../../pagination'
import {TagContext} from '../../../pages/tags/[...slug]'
import styled from '@emotion/styled'
import Post from '../home/post'
import H1 from '../../typography/heading1'
import Subscribe from '../home/subscribe'

const TagPage = () => {
  const {tag, posts} = React.useContext(TagContext)

  return (
    <Layout>
      <Wrapper className="relative flex flex-col items-center justify-center lg:px-0 px-4">
        <H1 size="4xl">{tag.tag}</H1>

        <Hashtag className="my-0 mx-auto max-w-md text-lg text-center">
          #{tag.slug}
        </Hashtag>
      </Wrapper>

      <PostsWrapper className="rounded-lg py-20 lg:px-24 px-4 relative">
        <div className="grid grid-cols-2 gap-6 mb-16">
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      </PostsWrapper>

      <Pagination center context={TagContext} route={`tags/${tag.slug}`} />

      <Subscribe className="mt-16 mx-auto" />
    </Layout>
  )
}

const Wrapper = styled.div`
  z-index: 1;
  margin: 100px auto 110px;
`

const Hashtag = styled.p`
  color: #73737d;
`

const PostsWrapper = styled.div`
  z-index: 1;
  background: linear-gradient(180deg, #fff 0%, rgba(249, 250, 252, 0) 91.01%);
`

export default TagPage
