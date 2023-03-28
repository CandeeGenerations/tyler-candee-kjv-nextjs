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
        <H1>Read some helpful posts from T. S. Candee today!</H1>
      </div>

      <FeaturedAuthor />

      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-4">
        <div className="col-span-2">
          <Subscribe />
        </div>

        <div className="col-span-1">
          <Wrapper className="rounded-lg p-10 relative shadow-xl mt-12 lg:mt-0">
            <Headings.h2>Today's Posts</Headings.h2>

            <p className="mt-2">Read today's posts right now!</p>

            <div className="grid grid-col-1 gap-4 mt-10 text-center">
              <ButtonLink href="/today">View Today's Posts</ButtonLink>
            </div>
          </Wrapper>
        </div>
      </div>

      <TagPostsWrapper>
        <div className="max-w-2xl my-32 lg:px-0 px-4">
          <Headings.h2>All Posts</Headings.h2>
        </div>

        <HomePosts posts={posts} />

        <div className="text-center md:text-left">
          <ButtonLink href="/posts">View More Posts</ButtonLink>
        </div>
      </TagPostsWrapper>

      <div className="grid md:grid-cols-2 grid-cols-1">
        {featuredTags.map((tag, index) => (
          <TagPostsWrapper key={index}>
            <div className="max-w-2xl my-32 lg:px-0 px-4">
              <Headings.h2 className="px-4">{tag.tag}</Headings.h2>
            </div>

            <HomePosts single posts={tag.posts} />

            <div className="px-4 mt-24 text-center md:text-left">
              <ButtonLink href={`/tags/${tag.slug}`}>
                View More Posts
              </ButtonLink>
            </div>
          </TagPostsWrapper>
        ))}
      </div>
    </Layout>
  )
}

const Wrapper = styled.div`
  max-width: 800px;
  border: 1px solid #dddddd;
  background: linear-gradient(180deg, #f1f1f1 0%, #fefefe 91.01%);
`

const TagPostsWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 200px;
  }
`

export default FeaturedTags
