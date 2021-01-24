import React from 'react'
import {getGQLClient} from '../../gql/request'
import {ALL_SERMONS, SERMONS_COUNT} from '../../gql/sermons'
import SermonsPage from '../../components/pages/sermons/sermonsPage'

export const SermonsContext = React.createContext<any>({})

const Preaching = (props) => {
  return (
    <SermonsContext.Provider value={props}>
      <SermonsPage />
    </SermonsContext.Provider>
  )
}

export const getStaticProps = async () => {
  const client = getGQLClient()
  const sermonsData = await client.request(ALL_SERMONS)
  const sermonsCountData = await client.request(SERMONS_COUNT)

  return {
    props: {
      sermons: sermonsData.sermons,
      count: sermonsCountData.sermonsCount,
      page: 1,
    },
  }
}

export default Preaching
