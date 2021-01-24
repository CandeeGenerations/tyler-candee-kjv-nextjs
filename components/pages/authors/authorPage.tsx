import React from 'react'
import Layout from '../../layout'
import AuthorSection from './authorSection'
import Pagination from '../../pagination'
import {AuthorContext} from '../../../pages/authors/[...slug]'
import styled from '@emotion/styled'
import Post from '../home/post'

const AuthorPage = () => {
  const {author, posts} = React.useContext(AuthorContext)

  return (
    <Layout>
      <AuthorSection />

      <PostsWrapper className="rounded-lg py-20 lg:px-24 px-4 relative">
        <div className="grid grid-cols-2 gap-6 mb-16">
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      </PostsWrapper>

      <Pagination
        center
        context={AuthorContext}
        route={`authors/${author.slug}`}
      />
    </Layout>
  )
}

const PostsWrapper = styled.div`
  z-index: 1;
  background: linear-gradient(180deg, #fff 0%, rgba(249, 250, 252, 0) 91.01%);
`

export default AuthorPage
