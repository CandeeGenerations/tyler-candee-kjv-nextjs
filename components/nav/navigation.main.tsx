import React, {useState} from 'react'
import Link from 'next/link'
import {css} from '@emotion/react'
import styled from '@emotion/styled'

const NavigationMain = ({footer = false}) => {
  const [showMenu, setShowMenu] = useState(false)

  const navigationItems = (
    <NavigationList>
      {footer && (
        <NavigationItem>
          <Link href="/">Home</Link>
        </NavigationItem>
      )}

      <NavigationItem>
        <Link href="/salvation">Salvation</Link>
      </NavigationItem>

      <NavigationItem>
        <Link href="/sermons">Sermons &amp; Devotionals</Link>
      </NavigationItem>
    </NavigationList>
  )

  const headerNavigation = (
    <NavigationContainer>{navigationItems}</NavigationContainer>
  )

  const footerNavigation = (
    <MobileNavigationContainer>
      {showMenu && navigationItems}

      <NavigationMobileLink onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? 'Hide' : 'Show'} Menu
      </NavigationMobileLink>
    </MobileNavigationContainer>
  )

  return footer ? footerNavigation : headerNavigation
}

const NavigationContainer = styled.div`
  width: 100%;
  margin-left: 30px;
  border-left: 1px solid #d8d8db;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const MobileNavigationContainer = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 200000001;
  background-color: #fafafa;
  border-top-left-radius: 40px;
  border-top: 1px solid #d8d8db;
  border-top-right-radius: 40px;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 769px) {
    display: none;
  }
`

const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const color = () => css`
  color: #000;
`

const NavigationItem = styled.li`
  display: inline-block;

  > a {
    margin: 0 5px;
    padding: 10px 15px 5px;
    ${color}

    &:hover {
      color: #6166dc;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: block;
    border-bottom: 1px solid #d8d8db;

    > a {
      display: block;
      padding: 20px 0;
      text-align: center;
    }
  }
`

const NavigationMobileLink = styled.div`
  color: #000;
  display: none;
  cursor: pointer;
  text-align: center;
  padding: 20px 0 30px 0;

  &:hover {
    color: #6166dc;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`

export default NavigationMain
