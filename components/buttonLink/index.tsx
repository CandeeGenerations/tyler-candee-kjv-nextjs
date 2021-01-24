import styled from '@emotion/styled'
import Link from 'next/link'

const ButtonLink = ({href, children, anchor = false}) => {
  let linkProps = {
    className: 'rounded-md py-4 px-12',
  }
  const anchorProps = {
    href: href,
    rel: 'noopener noreferrer',
    target: '_blank',
  }

  if (anchor) {
    linkProps = {...linkProps, ...anchorProps}
  }

  const link = <Button {...linkProps}>{children}</Button>

  return anchor ? (
    link
  ) : (
    <Link href={href} passHref>
      {link}
    </Link>
  )
}

const Button = styled.a`
  background-color: #000;
  color: #fff;
`

export default ButtonLink
