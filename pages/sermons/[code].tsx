import React from 'react'
import {SERMON_BY_CODE, SERMON_CODES} from '../../gql/sermons'
import {getGQLClient} from '../../gql/request'
import SermonPage from '../../components/pages/sermons/sermonPage'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'

export const SermonContext = React.createContext<any>({})

const Sermon = (props) => {
  return (
    <SermonContext.Provider value={props}>
      <Helmet title={`${props.sermon.title} | ${siteTitle}`} />

      <SermonPage />
    </SermonContext.Provider>
  )
}

export async function getStaticPaths() {
  const client = getGQLClient()
  const sermonCodes: any = await client.request(SERMON_CODES, {
    where: {type: 'Sermon'},
  })
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
  const sermonData: any = await client.request(SERMON_BY_CODE, {
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
