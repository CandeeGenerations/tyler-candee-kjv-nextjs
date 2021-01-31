import styled from '@emotion/styled'
import Link from 'next/link'

const ButtonLink = ({
  href = null,
  children,
  noBackground = false,
  anchor = false,
  submit = false,
}) => {
  let linkProps = {
    className: 'rounded-md py-4 px-12',
  }

  if (submit) {
    return (
      <RealButton type="submit" {...linkProps}>
        {children}
      </RealButton>
    )
  }

  const anchorProps = {
    href: href,
    rel: 'noopener noreferrer',
    target: '_blank',
  }

  if (anchor) {
    linkProps = {...linkProps, ...anchorProps}
  }

  const link = noBackground ? (
    <a {...linkProps}>{children}</a>
  ) : (
    <Button {...linkProps}>{children}</Button>
  )

  return anchor ? (
    link
  ) : (
    <Link href={href} passHref>
      {link}
    </Link>
  )
}

const Button = styled.a`
  background-color: #121212;
  color: #fff;
`

const RealButton = styled.button`
  background-color: #121212;
  color: #fff;
`

export default ButtonLink
