import React from 'react'
import {SermonsContext} from '../index'
import SermonsPage from '../../../components/pages/sermons/sermonsPage'
import {ALL_SERMONS, SERMONS_COUNT} from '../../../gql/sermons'
import {getGQLClient} from '../../../gql/request'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../../helpers/contants'

const Page = (props) => {
  return (
    <SermonsContext.Provider value={props}>
      <Helmet title={`Page ${props.page} - Sermons | ${siteTitle}`} />

      <SermonsPage />
    </SermonsContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const sermonsCountData: any = await client.request(SERMONS_COUNT, {
    where: {type: 'Sermon'},
  })
  const pages = Math.ceil(sermonsCountData.sermonsCount / 6)
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
  const sermonsData: any = await client.request(ALL_SERMONS, {
    where: {type: 'Sermon'},
    start: (pageNumber - 1) * 6,
  })
  const sermonsCountData: any = await client.request(SERMONS_COUNT, {
    where: {type: 'Sermon'},
  })

  return {
    props: {
      sermons: sermonsData.sermons,
      count: sermonsCountData.sermonsCount,
      page: pageNumber,
    },
  }
}

export default Page
