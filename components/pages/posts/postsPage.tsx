import React from 'react'
import Layout from '../../layout'
import HomePosts from '../home/posts'
import H1 from '../../typography/heading1'
import {PostsContext} from '../../../pages'
import Pagination from '../../pagination'
import styled from '@emotion/styled'
import FeaturedAuthor from '../home/featuredAuthor'

const PostsPage = () => {
  return (
    <Layout>
      <Wrapper className="relative flex flex-col items-center justify-center lg:px-0 px-4">
        <H1 size="4xl">All Posts</H1>
      </Wrapper>

      <FeaturedAuthor />

      <HomePosts />

      <Pagination route="posts" context={PostsContext} />
    </Layout>
  )
}

const Wrapper = styled.div`
  z-index: 1;
  margin: 100px auto 110px;
`

export default PostsPage
