import Link from 'next/link'
import styled from '@emotion/styled'
import readingTime from '../../../helpers/readingTime'
import {getDate, getImageUrl} from '../../../helpers'
import Image from '../../image'

const Post = ({
  route = '',
  className = '',
  data,
  narrow = true,
  full = false,
}) => {
  const postClasses = [
    'mb-2.5',
    'overflow-ellipsis',
    'overflow-hidden',
    'whitespace-normal',
  ].join(' ')

  return (
    <PostWrapper
      className={`col-span-2 md:col-span-1 ${
        full
          ? 'lg:col-span-2 lg:mb-0 md:mb-16 mb-0'
          : narrow
          ? 'lg:col-span-1'
          : 'lg:col-span-2'
      } ${className}`}
    >
      <Link
        href={`/${route ? `${route}/` : ''}${data.slug || data.code}`}
        passHref
      >
        <PostLink>
          <PostContainer
            className={`md:shadow-none md:hover:shadow-none shadow-2xl hover:shadow-lg rounded-b-lg md:rounded-none ${
              full ? 'full' : ''
            }`}
          >
            <PostImageWrapper className="shadow-none hover:shadow-none md:shadow-2xl md:hover:shadow-lg md:mb-7 mb-0 rounded-lg">
              <PostImageContainer className="md:rounded-lg rounded-t-lg">
                <Image src={getImageUrl(data.hero.url)} alt={data.slug} />
              </PostImageContainer>
            </PostImageWrapper>

            <div className="p-4 md:p-0">
              <PostTitle
                className={`${postClasses} text-xl font-bold font-serif`}
              >
                {data.title}
              </PostTitle>

              {data.excerpt && (
                <PostExcerpt
                  className={`${postClasses} text-base break-normal`}
                >
                  {data.excerpt}
                </PostExcerpt>
              )}

              <PostMetadata className="text-base font-semibold opacity-30">
                {getDate(data.date)}
                {data.body && `· ${readingTime(data.body)}`}
              </PostMetadata>
            </div>
          </PostContainer>
        </PostLink>
      </Link>
    </PostWrapper>
  )
}

const PostWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s ease-out;
`

const PostLink = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s ease-out;

  &:hover h2 {
    color: #6166dc;
  }
`

const PostContainer = styled.div`
  position: relative;

  &.full {
    @media (min-width: 1024px) {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 488px;
      column-gap: 96px;
      align-items: center;
      position: relative;
      margin-bottom: 50px;
    }
  }

  @media (max-width: 640px) {
    background: #fff;
  }
`

const PostImageWrapper = styled.div`
  position: relative;
  height: 280px;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
`

const PostImageContainer = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`

const PostTitle = styled.h2`
  color: #000;
  word-break: keep-all;
  transition: color 0.3s ease-in-out;
  overflow-wrap: normal;
`

const PostExcerpt = styled.p`
  color: #73737d;
  max-width: 515px;
`

const PostMetadata = styled.div`
  color: #73737d;
`

export default Post
