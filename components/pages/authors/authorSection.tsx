import React from 'react'
import styled from '@emotion/styled'
import {AuthorContext} from '../../../pages/authors/[...slug]'
import H1 from '../../typography/heading1'
import SocialIcons from '../../socialIcons'
import Image from '../../image'

const AuthorSection = () => {
  const {author} = React.useContext(AuthorContext)

  return (
    <AuthorWrapper className="relative flex flex-col items-center justify-center lg:px-0 px-4">
      <AvatarWrapper className="relative mb-8 rounded-full overflow-hidden shadow-xl">
        <div className="relative overflow-hidden rounded-full">
          <AvatarBlock className="w-full" />

          <div className="w-full h-full absolute top-0 left-0 delay-500">
            <Image src={author.avatar.url} alt={author.name} />
          </div>
        </div>
      </AvatarWrapper>

      <H1 size="4xl">{author.name}</H1>

      <Bio className="my-0 mx-auto max-w-md text-lg text-center">
        {author.bio}
      </Bio>

      <div className="mt-9">
        <SocialIcons networkList={author.social || []} />
      </div>
    </AuthorWrapper>
  )
}

const AuthorWrapper = styled.div`
  z-index: 1;
  margin: 35px auto 110px;
`

const AvatarWrapper = styled.div`
  z-index: 1;
  height: 164px;
  width: 164px;
  border: 2px solid #fafafa;
`

const AvatarBlock = styled.div`
  padding-bottom: 100.121%;
`

const Bio = styled.p`
  color: #73737d;
`

export default AuthorSection
