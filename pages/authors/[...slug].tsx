import {getGQLClient} from '../../gql/request'
import {AUTHORS_SLUGS, GET_AUTHOR_BY_SLUG} from '../../gql/authors'
import React from 'react'
import {AUTHOR_POSTS, POSTS_COUNT_BY_AUTHOR} from '../../gql/posts'
import AuthorPage from '../../components/pages/authors/authorPage'
import {getPaths} from '../../helpers'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'

export const AuthorContext = React.createContext<any>({})

const Author = (props) => {
  return (
    <AuthorContext.Provider value={props}>
      <Helmet
        title={`${props.page > 1 ? `Page ${props.page} - ` : ''}${
          props.author.name
        } | ${siteTitle}`}
      />

      <AuthorPage />
    </AuthorContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const authorSlugs = await client.request(AUTHORS_SLUGS)

  return {
    paths: getPaths(authorSlugs.authorSlugs),
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const pageNumber = params.slug.length > 1 ? params.slug[2] : 1
  const client = getGQLClient()
  const authorData = await client.request(GET_AUTHOR_BY_SLUG, {
    slug: params.slug[0],
  })
  const author = authorData.authors[0]
  const authorPostsData = await client.request(AUTHOR_POSTS, {
    start: (pageNumber - 1) * 6,
    authorId: author.id,
  })
  const postsCountByAuthorData = await client.request(POSTS_COUNT_BY_AUTHOR, {
    authorId: author.id,
  })

  return {
    props: {
      author,
      count: postsCountByAuthorData.postsCount,
      page: Number(pageNumber),
      posts: authorPostsData.posts,
    },
  }
}

export default Author
