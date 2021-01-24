import Layout from '../../layout'
import React from 'react'
import Image from 'next/image'
import {getDate, getImageUrl} from '../../../helpers'
import {SermonContext} from '../../../pages/sermons/[code]'
import styled from '@emotion/styled'
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

      {/*<HeroWrapper*/}
      {/*  id="ArticleImage__Hero"*/}
      {/*  className="relative max-w-4xl overflow-hidden my-0 mx-auto shadow-2xl rounded-xl"*/}
      {/*>*/}
      {/*  <Image*/}
      {/*    src={getImageUrl(sermon.hero.url)}*/}
      {/*    width={sermon.hero.width}*/}
      {/*    height={sermon.hero.height}*/}
      {/*  />*/}
      {/*</HeroWrapper>*/}

      <SermonFrame
        src={`https://www.youtube.com/embed/${sermon.code}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></SermonFrame>
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

const HeroWrapper = styled.div`
  z-index: 1;

  > div {
    display: block !important;
  }
`

const SermonFrame = styled.iframe`
  width: 100%;
  border: 0;
  height: 450px;
  margin-top: 20px;

  @media (min-width: 1024px) {
    height: 700px;
  }
`

export default SermonPage
