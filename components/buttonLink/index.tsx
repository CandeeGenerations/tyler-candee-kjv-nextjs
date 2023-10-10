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

  return anchor ? (
    noBackground ? (
      <a {...linkProps}>{children}</a>
    ) : (
      <Button {...linkProps}>{children}</Button>
    )
  ) : noBackground ? (
    <Link href={href} {...linkProps}>
      {children}
    </Link>
  ) : (
    <ButtonAnchor href={href} {...linkProps}>
      {children}
    </ButtonAnchor>
  )
}

const Button = styled.a`
  background-color: #121212;
  color: #fff;
`

const ButtonAnchor = styled(Link)`
  background-color: #121212;
  color: #fff;
`

const RealButton = styled.button`
  background-color: #121212;
  color: #fff;
`

export default ButtonLink
