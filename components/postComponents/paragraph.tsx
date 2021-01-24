import styled from '@emotion/styled'

const Paragraph = styled.p`
  line-height: 1.756;
  font-size: 18px;
  color: #08080b;
  transition: background 0.25s ease-in-out), color 0.25s ease-in-out;
  margin: 0 auto 35px;
  width: 100%;
  max-width: 680px;

  b {
    font-weight: 800;
  }

  @media (max-width: 1070px) {
    max-width: 507px;
  }

  @media (max-width: 735px) {
    max-width: 486px;
    margin: 0 auto 25px;
  }

  @media (max-width: 540px) {
    padding: 0 20px;
  }
`

export default Paragraph
