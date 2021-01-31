import React from 'react'
import SermonsPage from '../../../components/pages/sermons/sermonsPage'
import {ALL_SERMONS, SERMONS_COUNT} from '../../../gql/sermons'
import {getGQLClient} from '../../../gql/request'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../../helpers/contants'
import {SermonsContext} from '../../sermons'

const Page = (props) => {
  return (
    <SermonsContext.Provider value={props}>
      <Helmet title={`Page ${props.page} - Devotionals | ${siteTitle}`} />

      <SermonsPage devotionals />
    </SermonsContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const sermonsCountData = await client.request(SERMONS_COUNT, {
    where: {type: 'Devotional'},
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
  const sermonsData = await client.request(ALL_SERMONS, {
    where: {type: 'Devotional'},
    start: (pageNumber - 1) * 6,
  })
  const sermonsCountData = await client.request(SERMONS_COUNT, {
    where: {type: 'Devotional'},
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
