import styled from '@emotion/styled'

const UnorderedList = styled.ul`
  list-style: none;
  counter-reset: list;
  color: #08080b;
  position: relative;
  padding: 15px 0 30px 30px;
  transition: background 0.25s ease-in-out, color 0.25s ease-in-out;
  margin: 0 auto;
  font-size: 18px;

  width: 100%;
  max-width: 680px;

  @media (max-width: 1070px) {
    max-width: 507px;
  }

  @media (max-width: 735px) {
    max-width: 486px;
    padding-left: 0px;
  }

  @media (max-width: 540px) {
    padding-left: 20px;
  }

  li {
    position: relative;
    padding-bottom: 15px;

    @media (max-width: 735px) {
      padding-left: 30px;
    }

    @media (max-width: 540px) {
      padding-left: 30px;
    }

    p {
      @media (max-width: 735px) {
        padding: 0;
      }
    }
  }

  li > :not(ol, ul) {
    display: inline;
  }

  li::before {
    width: 3rem;
    display: inline-block;
    position: absolute;
    color: #08080b;
  }

  li::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 8px;
    height: 8px;
    width: 8px;
    background: #08080b;

    @media (max-width: 735px) {
      left: 0;
    }
  }
`

export default UnorderedList
