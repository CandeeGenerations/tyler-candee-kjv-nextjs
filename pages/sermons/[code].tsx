import React from 'react'
import {SERMON_BY_CODE, SERMON_CODES} from '../../gql/sermons'
import {getGQLClient} from '../../gql/request'
import SermonPage from '../../components/pages/sermons/sermonPage'

export const SermonContext = React.createContext<any>({})

const Sermon = (props) => {
  return (
    <SermonContext.Provider value={props}>
      <SermonPage />
    </SermonContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const sermonCodes = await client.request(SERMON_CODES)
  let paths = []

  sermonCodes.sermons.forEach((sermon) => {
    paths.push({params: {code: sermon.code}})
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const client = getGQLClient()
  const sermonData = await client.request(SERMON_BY_CODE, {
    code: params.code,
  })
  const sermon = sermonData.sermons[0]

  return {
    props: {
      sermon,
    },
  }
}

export default Sermon
