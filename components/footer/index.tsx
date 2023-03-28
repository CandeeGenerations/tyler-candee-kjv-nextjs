import dayjs from 'dayjs'
import styled from '@emotion/styled'
import SocialIcons from '../socialIcons'
import NavigationMain from '../nav/navigation.main'
import Verse from './verse'

const Footer = () => {
  const year = dayjs().format('YYYY')

  return (
    <>
      <Border className="relative" />

      <FooterWrapper className="relative flex items-center content-between lg:pb-20 pb-32 lg:flex-row flex-col">
        <div className="flex-grow pb-16 lg:pb-0 text-center lg:text-left">
          &copy; 2020 - {year} T. S. Candee (
          <a href="https://ko-fi.com/tylercandeekjv" target="_blank">
            Buy me a Coffee
          </a>
          )
        </div>

        <SocialIcons networkList={process.env.social} />
      </FooterWrapper>

      <NavigationMain footer />

      <Verse />
    </>
  )
}

const Border = styled.div`
  margin: 140px auto 50px;
  border-bottom: 1px solid rgba(8, 8, 11, 0.15);
`

const FooterWrapper = styled.div`
  color: #73737d;
`

const Copyright = styled.div``

export default Footer
