import styled from '@emotion/styled'

const Anchor = styled.a`
  transition: background 0.25s ease-in-out, color 0.25s ease-in-out;
  color: #6166dc;

  &:visited {
    color: #6166dc;
    opacity: 0.85;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

export default Anchor
