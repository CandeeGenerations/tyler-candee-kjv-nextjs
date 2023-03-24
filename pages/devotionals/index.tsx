import React from 'react'
import {getGQLClient} from '../../gql/request'
import {ALL_SERMONS, SERMONS_COUNT} from '../../gql/sermons'
import SermonsPage from '../../components/pages/sermons/sermonsPage'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'
import {SermonsContext} from '../sermons'

const Devotionals = (props) => {
  return (
    <SermonsContext.Provider value={props}>
      <Helmet title={`Devotionals | ${siteTitle}`} />

      <SermonsPage devotionals />
    </SermonsContext.Provider>
  )
}

export const getStaticProps = async () => {
  const client = getGQLClient()
  const sermonsData: any = await client.request(ALL_SERMONS, {
    where: {type: 'Devotional'},
  })
  const sermonsCountData: any = await client.request(SERMONS_COUNT, {
    where: {type: 'Devotional'},
  })

  return {
    props: {
      sermons: sermonsData.sermons,
      count: sermonsCountData.sermonsCount,
      page: 1,
    },
  }
}

export default Devotionals
