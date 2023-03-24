import React from 'react'
import Layout from '../../components/layout'
import {getGQLClient} from '../../gql/request'
import {TAGS_SLUGS} from '../../gql/tags'
import {TAG_POSTS} from '../../gql/posts'
import TagsPage from '../../components/pages/tags/tagsPage'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'

export const TagsContext = React.createContext<any>({})

const Tags = (props) => {
  return (
    <TagsContext.Provider value={props}>
      <Helmet title={`All Tags | ${siteTitle}`} />

      <Layout>
        <TagsPage />
      </Layout>
    </TagsContext.Provider>
  )
}

export const getStaticProps = async () => {
  const client = getGQLClient()
  const tagSlugs: any = await client.request(TAGS_SLUGS, {
    sort: 'featured:desc,order:asc,slug:asc',
  })
  const tags = tagSlugs.tagSlugs

  for (const index in tags) {
    const tag = tags[index]
    const tagPosts: any = await client.request(TAG_POSTS, {tagId: tag.id})

    tags[index].posts = tagPosts.posts
  }

  return {
    props: {
      tags,
    },
  }
}

export default Tags
