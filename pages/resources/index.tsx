import React from 'react'
import {getGQLClient} from '../../gql/request'
import {PostsContext} from '../index'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'
import {ALL_RESOURCES, RESOURCE_COUNT} from '../../gql/resources'
import ResourcesPage from '../../components/pages/resources/resourcesPage'

const Resources = (props) => {
  return (
    <PostsContext.Provider value={props}>
      <Helmet title={`Resources | ${siteTitle}`} />

      <ResourcesPage />
    </PostsContext.Provider>
  )
}

export const getStaticProps = async () => {
  const client = getGQLClient()
  const resourcesData: any = await client.request(ALL_RESOURCES)
  const resourceCountData: any = await client.request(RESOURCE_COUNT)

  return {
    props: {
      resources: resourcesData.resources,
      count: resourceCountData.resourceCount,
      page: 1,
    },
  }
}

export default Resources
