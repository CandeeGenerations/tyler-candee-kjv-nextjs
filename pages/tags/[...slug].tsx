import React from 'react'
import {GET_TAG_BY_SLUG, TAGS_SLUGS} from '../../gql/tags'
import {POSTS_COUNT_BY_TAG, TAG_POSTS} from '../../gql/posts'
import {getGQLClient} from '../../gql/request'
import TagPage from '../../components/pages/tags/tagPage'
import {getPaths} from '../../helpers'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'

export const TagContext = React.createContext<any>({})

const Tag = (props) => {
  return (
    <TagContext.Provider value={props}>
      <Helmet
        title={`${props.page > 1 ? `Page ${props.page} - ` : ''}${
          props.tag.tag
        } | ${siteTitle}`}
      />

      <TagPage />
    </TagContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const tagSlugs = await client.request(TAGS_SLUGS)

  return {
    paths: getPaths(tagSlugs.tagSlugs),
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const pageNumber = params.slug.length > 1 ? params.slug[2] : 1
  const client = getGQLClient()
  const tagData = await client.request(GET_TAG_BY_SLUG, {
    slug: params.slug[0],
  })
  const tag = tagData.tags[0]
  const tagPostsData = await client.request(TAG_POSTS, {
    start: (pageNumber - 1) * 6,
    tagId: tag.id,
  })
  const postsCountByTagData = await client.request(POSTS_COUNT_BY_TAG, {
    tagId: tag.id,
  })

  return {
    props: {
      tag,
      count: postsCountByTagData.postsCount,
      page: Number(pageNumber),
      posts: tagPostsData.posts,
    },
  }
}

export default Tag
