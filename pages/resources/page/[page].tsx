import {getGQLClient} from '../../../gql/request'
import React from 'react'
import {PostsContext} from '../../index'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../../helpers/contants'
import {ALL_RESOURCES, RESOURCE_COUNT} from '../../../gql/resources'
import ResourcesPage from '../../../components/pages/resources/resourcesPage'

const ResourcePage = (props) => {
  return (
    <PostsContext.Provider value={props}>
      <Helmet title={`Page ${props.page} - Resources | ${siteTitle}`} />

      <ResourcesPage />
    </PostsContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const resourceCountData = await client.request(RESOURCE_COUNT)
  const pages = Math.ceil(resourceCountData.resourceCount / 10)
  const paths = []

  for (let i = 2; i <= pages; i++) {
    paths.push({params: {page: `${i}`}})
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const client = getGQLClient()
  const pageNumber = Number(params.page)
  const resourcesData = await client.request(ALL_RESOURCES, {
    start: (pageNumber - 1) * 10,
  })
  const resourceCountData = await client.request(RESOURCE_COUNT)

  return {
    props: {
      resources: resourcesData.resources,
      count: resourceCountData.resourceCount,
      page: pageNumber,
    },
  }
}

export default ResourcePage
