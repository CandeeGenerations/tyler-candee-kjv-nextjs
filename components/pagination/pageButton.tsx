import Link from 'next/link'
import styled from '@emotion/styled'

const PageButton = ({
  href,
  number = true,
  style = {},
  className = '',
  children,
}) => {
  return (
    <Link href={href} passHref>
      <Button
        style={style}
        className={`hover:underline block w-auto h-auto font-${
          number ? 'normal' : 'semibold'
        } text-lg no-underline leading-none items-center justify-center tabular-nums ${className}`}
      >
        {children}
      </Button>
    </Link>
  )
}

const Button = styled.a`
  color: #000;
  padding: 2rem;

  @media (min-width: 1024px) {
    padding: 2rem 2rem 2rem 0;
  }
`

export default PageButton
