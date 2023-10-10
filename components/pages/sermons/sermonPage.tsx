import styled from '@emotion/styled'
import React from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import {getDate} from '../../../helpers'
import {SermonContext} from '../../../pages/sermons/[code]'
import Layout from '../../layout'
import H1 from '../../typography/heading1'

const SermonPage = () => {
  const {sermon} = React.useContext(SermonContext)

  return (
    <Layout>
      <header className="relative z-10 mt-24 mb-28 mx-auto lg:pl-16 px-4 md:px-0 max-w-2xl">
        <Header className="font-serif keep-all">{sermon.title}</Header>

        <SubHeader className="relative flex text-lg lg:flex-row flex-col">
          <div className="ml-0 text-sm lg:text-lg">{getDate(sermon.date)}</div>
        </SubHeader>
      </header>

      <LiteYouTubeEmbed id={sermon.code} title={sermon.title} />
    </Layout>
  )
}

const Header = styled(H1)`
  word-break: keep-all;
  line-height: 1.32;
`

const SubHeader = styled.div`
  color: #73737d;
`

export default SermonPage
