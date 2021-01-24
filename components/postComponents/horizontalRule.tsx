import styled from '@emotion/styled'

const HorizontalRule = styled.hr`
  position: relative;
  width: 100%;
  max-width: 680px;
  margin: 50px auto;
  border: 0;
  height: 14.36px;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.567383' y='14.1777' width='16' height='1' transform='rotate(-60 0.567383 14.1777)' fill='%232D2E33'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  box-sizing: border-box;
  background-position: center;

  @media (max-width: 1070px) {
    max-width: 507px;
  }

  @media (max-width: 735px) {
    max-width: 486px;
    width: calc(100vw - 40px);
    margin: 0px auto 50px;
  }

  @media (max-width: 540px) {
    padding: 0 20px;
  }
`

export default HorizontalRule
