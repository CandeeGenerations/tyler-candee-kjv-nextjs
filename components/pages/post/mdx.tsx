import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import rehype2react from 'rehype-react'
import rehypeRaw from 'rehype-raw'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import parse from 'remark-parse'
import ImageZoom from '../../postComponents/image.zoom'
import Anchor from '../../postComponents/anchor'
import Blockquote from '../../postComponents/blockquote'
import Headings from '../../postComponents/headings'
import HorizontalRule from '../../postComponents/horizontalRule'
import UnorderedList from '../../postComponents/list.unordered'
import OrderedList from '../../postComponents/list.ordered'
import Paragraph from '../../postComponents/paragraph'

const components = {
  img: ImageZoom,
  a: Anchor,
  blockquote: Blockquote,
  h1: Headings.h1,
  h2: Headings.h2,
  h3: Headings.h3,
  h4: Headings.h4,
  h5: Headings.h5,
  h6: Headings.h6,
  hr: HorizontalRule,
  ul: UnorderedList,
  ol: OrderedList,
  p: Paragraph,
}

const MDX = ({content, children = null, nonPost = false, ...props}) => {
  const processor = unified()
    .use(parse)
    .use(remark2rehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehype2react, {createElement: React.createElement, components})

  return (
    <MDXBody
      className={`relative z-10 flex justify-center flex-col ${
        nonPost ? 'non-post' : ''
      }`}
    >
      {processor.processSync(content).result}

      {children}
    </MDXBody>
  )
}

const IMAGE_WIDTHS = {
  regular: '680px',
  large: '1004px',
  full: '100vw',
}

const ARTICLE_WIDTH = css`
  width: 100%;
  max-width: 680px;

  @media (max-width: 1024px) {
    max-width: 507px;
  }

  @media (max-width: 768px) {
    max-width: 486px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

const HeadingsCSS = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 auto;
  }

  h1,
  h1 *,
  h2,
  h2 * {
    margin: 25px auto 18px;

    @media (max-width: 735px) {
      margin: 30px auto 18px;
    }
  }

  h3,
  h3 * {
    margin: 20px auto 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${ARTICLE_WIDTH};
  }
`

const ImageCSS = css`
  .gatsby-resp-image-background-image {
    display: none !important;
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    border-radius: 5px;

    @media (v-width: 735px) {
      margin: 10px auto 45px;
    }
  }

  div.Image__Small {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    border-radius: 5px;
    width: 100%;
    max-width: 680px;

    @media (max-width: 1070px) {
      max-width: 507px;
    }

    @media (max-width: 735px) {
      max-width: 486px;
      margin: 0 auto 25px;
    }

    @media (max-width: 540px) {
      padding: 0 20px;
    }
  }

  .Image__Container {
    text-align: center;
  }

  img.Image__With-Shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  div.Image__Medium {
    position: relative;
    margin: 15px auto 50px;
    width: 100%;
    max-width: ${IMAGE_WIDTHS.large};

    @media (max-width: 1280px) {
      left: -34px;
    }

    @media (max-width: 1070px) {
      left: -26px;
    }

    @media (max-width: 735px) {
      border-radius: 0;
      left: 0;
      margin: 0 auto 25px;

      img {
        border-radius: 0;
      }
    }
  }

  div.Image__Large {
    position: relative;
    left: -68px;
    width: ${IMAGE_WIDTHS.full};
    margin: 25px auto 60px;
    pointer-events: none;

    img {
      border-radius: 0;
    }

    @media (max-width: 1070px) {
      left: -53px;
    }

    @media (max-width: 735px) {
      left: 0;
      margin: 0 auto 25px;
    }
  }
`

const MDXBody = styled.div`
  ${HeadingsCSS}
  ${ImageCSS}
`

export default MDX
