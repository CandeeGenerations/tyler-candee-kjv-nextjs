import React from 'react'
import Layout from '../../layout'
import FeaturedAuthor from './featuredAuthor'
import HomePosts from './posts'
import H1 from '../../typography/heading1'
import {PostsContext} from '../../../pages'
import styled from '@emotion/styled'
import Headings from '../../postComponents/headings'
import ButtonLink from '../../buttonLink'
import Subscribe from './subscribe'

const FeaturedTags = () => {
  const {featuredTags, posts} = React.useContext(PostsContext)

  return (
    <Layout>
      <div className="max-w-2xl my-32 lg:px-0 px-4">
        <H1>Read some helpful posts from Tyler Candee today!</H1>
      </div>

      <FeaturedAuthor />

      <Subscribe />

      {featuredTags.map((tag, index) => (
        <TagPostsWrapper key={index}>
          <div className="max-w-2xl my-32 lg:px-0 px-4">
            <Headings.h2>{tag.tag}</Headings.h2>
          </div>

          <HomePosts posts={tag.posts} />

          <ButtonLink href={`/tags/${tag.slug}`}>View More Posts</ButtonLink>
        </TagPostsWrapper>
      ))}

      <TagPostsWrapper>
        <div className="max-w-2xl my-32 lg:px-0 px-4">
          <Headings.h2>All Posts</Headings.h2>
        </div>

        <HomePosts posts={posts} />

        <ButtonLink href="/posts">View More Posts</ButtonLink>
      </TagPostsWrapper>
    </Layout>
  )
}

const TagPostsWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 200px;
  }
`

export default FeaturedTags
