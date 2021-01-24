import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'
import {getImageUrl} from '../../../helpers'
import {PostsContext} from '../../../pages'
import TilesIcon from '../../icons/tiles'
import RowsIcon from '../../icons/rows'
import {GridLayoutContext} from './gridLayout'

const FeaturedAuthor = () => {
  const {author} = React.useContext(PostsContext)
  const {changeLayout, tiles, layout} = React.useContext(GridLayoutContext)

  return (
    <div className="md:grid grid-cols-3 my-32 hidden">
      <div className="col-span-2">
        <div className="flex items-center relative -left-2.5">
          <Link href={`/authors/${author.slug}`} passHref>
            <AuthorLink className="block relative h-10 w-10 rounded-full">
              <AuthorImageWrapper className="h-10 w-10 mr-4 overflow-hidden rounded-full">
                <div className="overflow-hidden relative rounded-full">
                  <AuthorImagePush />

                  <Image
                    className="absolute top-0 left-0 w-full h-full"
                    src={getImageUrl(author.avatar.url)}
                    alt={author.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center center"
                  />
                </div>
              </AuthorImageWrapper>
            </AuthorLink>
          </Link>

          <AuthorBio className="text-sm max-w-md">{author.bio}</AuthorBio>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center">
        <GridButton
          onClick={() => changeLayout('rows')}
          data-a11y="false"
          title="Show articles in Row grid"
          aria-label="Show articles in Row grid"
        >
          <RowsIcon active={!tiles} />
        </GridButton>

        <GridButton
          onClick={() => changeLayout('tiles')}
          data-a11y="false"
          title="Show articles in Tile grid"
          aria-label="Show articles in Tile grid"
        >
          <TilesIcon active={tiles} />
        </GridButton>
      </div>
    </div>
  )
}

const AuthorLink = styled.a`
  background: rgba(0, 0, 0, 0.25);
  margin: 10px 26px 10px 10px;

  &:after {
    content: '';
    position: absolute;
    left: -6px;
    top: -5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const AuthorImageWrapper = styled.div`
  background: rgba(0, 0, 0, 0.25);
`

const AuthorImagePush = styled.div`
  width: 100%;
  padding-bottom: 100.121%;
`

const AuthorBio = styled.p`
  color: #73737d;
`

const GridButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:first-of-type) {
    margin-right: 30px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid #6166dc;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    transition: opacity 0.2s;

    path {
      fill: #000;
    }
  }
`

export default FeaturedAuthor
