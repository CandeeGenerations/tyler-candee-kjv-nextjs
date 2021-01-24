import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import throttle from 'lodash/throttle'
import styled from '@emotion/styled'
import {PostContext} from '../../../pages/[slug]'
import Layout from '../../layout'
import H1 from '../../typography/heading1'
import {getDate, getImageUrl} from '../../../helpers'
import readingTime from '../../../helpers/readingTime'
import NextPosts from './nextPosts'
import MDXRenderer from './mdx'
// import Aside from './aside'
// import Progress from './progress'
import PostSEO from './seo'
import Comments from './comments'
import Tag from './tag'

const PostPage = () => {
  const {post, nextPosts} = React.useContext(PostContext)
  const contentSectionRef = React.useRef<HTMLElement>(null)

  // const [hasCalculated, setHasCalculated] = React.useState<boolean>(false)
  // const [contentHeight, setContentHeight] = React.useState<number>(0)

  // React.useEffect(() => {
  //   const calculateBodySize = throttle(() => {
  //     const contentSection = contentSectionRef.current
  //
  //     if (!contentSection) return
  //
  //     /**
  //      * If we haven't checked the content's height before,
  //      * we want to add listeners to the content area's
  //      * imagery to recheck when it's loaded
  //      */
  //     if (!hasCalculated) {
  //       const debouncedCalculation = debounce(calculateBodySize)
  //       const $imgs = contentSection.querySelectorAll('img')
  //
  //       $imgs.forEach(($img) => {
  //         // If the image hasn't finished loading then add a listener
  //         if (!$img.complete) $img.onload = debouncedCalculation
  //       })
  //
  //       // Prevent rerun of the listener attachment
  //       setHasCalculated(true)
  //     }
  //
  //     // Set the height and offset of the content area
  //     setContentHeight(contentSection.getBoundingClientRect().height)
  //   }, 20)
  //
  //   calculateBodySize()
  //   window.addEventListener('resize', calculateBodySize)
  //
  //   return () => window.removeEventListener('resize', calculateBodySize)
  // }, [])

  return (
    <Layout>
      <PostSEO post={post} location={`${process.env.siteUrl}/${post.slug}`} />

      <header className="relative z-10 mt-24 mb-28 mx-auto lg:pl-16 px-4 md:px-0 max-w-2xl">
        <Header className="font-serif keep-all">{post.title}</Header>

        <SubHeader className="relative flex text-lg lg:flex-row flex-col">
          <Link href={`/authors/${post.author.slug}`} passHref>
            <AuthorLink className="flex items-center">
              <AuthorImageWrapper className="rounded-full mr-3 overflow-hidden hidden lg:block">
                <div className="relative overflow-hidden">
                  <Image
                    src={getImageUrl(post.author.avatar.url)}
                    alt={post.author.name}
                    height={25}
                    width={25}
                  />
                </div>
              </AuthorImageWrapper>

              <strong className="text-sm lg:text-lg">{post.author.name}</strong>

              <span className="hidden lg:block">,&nbsp;</span>
            </AuthorLink>
          </Link>

          <div className="ml-0 text-sm lg:text-lg">
            {getDate(post.date)} · {readingTime(post.body)}
          </div>
        </SubHeader>
      </header>

      <HeroWrapper
        id="ArticleImage__Hero"
        className="relative max-w-4xl overflow-hidden my-0 mx-auto shadow-2xl rounded-xl"
      >
        <Image
          src={getImageUrl(post.hero.url)}
          width={post.hero.width}
          height={post.hero.height}
        />
      </HeroWrapper>

      {/*<Aside contentHeight={contentHeight}>*/}
      {/*  <Progress contentHeight={contentHeight} />*/}
      {/*</Aside>*/}

      <PostBody
        ref={contentSectionRef}
        className="relative pt-40 pb-9 pr-0 lg:pl-16"
      >
        <MDXRenderer content={post.body} />
      </PostBody>

      <Tag />

      <Comments />

      {nextPosts.length > 0 && (
        <section className="w-full my-0 mx-auto py-0 px-16 block">
          <NextPostsHeader className="relative mb-24 font-medium opacity-25 text-center lg:text-left">
            More articles from {post.author.name}
          </NextPostsHeader>

          <NextPosts />
        </section>
      )}
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

const AuthorLink = styled.a`
  color: inherit;
`

const AuthorImageWrapper = styled.div`
  height: 25px;
  width: 25px;
  background: #73737d;
`

const HeroWrapper = styled.div`
  z-index: 1;

  > div {
    display: block !important;
  }
`

const PostBody = styled.article`
  transition: background 0.2s linear;
`

const NextPostsHeader = styled.h3`
  color: #000;

  @media (min-width: 1024px) {
    &:after {
      content: '';
      position: absolute;
      background: #73737d;
      width: 70%;
      height: 1px;
      right: 0px;
      top: 11px;
    }
  }
`

export default PostPage
