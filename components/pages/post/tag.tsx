import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import {PostContext} from '../../../pages/[slug]'

const Tag = () => {
  const {post} = React.useContext(PostContext)

  return (
    <section className="w-full my-0 mx-auto py-0 px-4 md:px-16 flex items-center flex-col md:flex-row">
      <Header className="relative mr-4 font-medium opacity-25 text-center lg:text-left mb-4 md:mb-0">
        Tags:
      </Header>

      {post.tags.map((post) => (
        <TagLink
          key={post.slug}
          href={`/tags/${post.slug}`}
          className="rounded-full text-sm py-2 px-6 shadow hover:shadow-md mb-4 md:mb-0"
        >
          #{post.slug}
        </TagLink>
      ))}
    </section>
  )
}

const Header = styled.h3`
  color: #000;
`

const TagLink = styled(Link)`
  background-color: #ededed;
  color: #000;
  transition:
    transform 0.3s ease-out,
    box-shadow 0.3s ease-out;

  &:not(:last-of-type) {
    margin-right: 15px;
  }
`

export default Tag
