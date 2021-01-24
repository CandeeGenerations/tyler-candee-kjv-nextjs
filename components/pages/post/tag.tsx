import React from 'react'
import Link from 'next/link'
import {PostContext} from '../../../pages/[slug]'
import styled from '@emotion/styled'

const Tag = () => {
  const {post} = React.useContext(PostContext)
  const {slug} = post.tag

  return (
    <section className="w-full my-0 mx-auto py-0 px-16 flex items-center">
      <Header className="relative mr-4 font-medium opacity-25 text-center lg:text-left">
        Tags:
      </Header>

      <Link href={`/tags/${slug}`} passHref>
        <TagLink className="rounded-full text-sm py-2 px-6 shadow hover:shadow-md">
          #{slug}
        </TagLink>
      </Link>
    </section>
  )
}

const Header = styled.h3`
  color: #000;
`

const TagLink = styled.a`
  background-color: #ededed;
  color: #000;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
`

export default Tag
