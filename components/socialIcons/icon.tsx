import styled from '@emotion/styled'
import icons from '../icons'
import {NetworkType} from './index'

const Icon = ({
  className,
  slug,
  network,
}: {
  className?: string
  slug?: string
  network: NetworkType
}) => {
  const urls = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
    linkedin: 'https://linkedin.com/in/',
  }

  const IconComponent = icons[network]

  return slug ? (
    <IconImage
      className={`${className} relative no-underline ml-0`}
      href={`${urls[network]}${slug}`}
      target="_blank"
    >
      <IconComponent fill="#73737D" />
    </IconImage>
  ) : null
}

const IconImage = styled.a`
  max-width: 1rem;
`

export default Icon
