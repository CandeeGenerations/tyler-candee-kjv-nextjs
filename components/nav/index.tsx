import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import {getWindowDimensions} from '../../helpers'
import ChevronLeft from '../icons/chevron.left'
import {useRouter} from 'next/router'
import ExIcon from '../icons/ex'
import SharePageButton from './sharePageButton'
import NavigationMain from './navigation.main'

const Nav = () => {
  const router = useRouter()
  const [showBackArrow, setShowBackArrow] = React.useState<boolean>(false)

  React.useEffect(() => {
    const {width} = getWindowDimensions()
    const prev = localStorage.getItem('previousPath')
    const previousPathWasHomepage =
      prev === '/' || (prev && prev.includes('/page/'))
    const isNotPaginated = !location.pathname.includes('/page/')

    setShowBackArrow(previousPathWasHomepage && isNotPaginated && width <= 540)
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0">
      <NavContainer>
        <LogoLink href="/" back={showBackArrow ? 'true' : 'false'} passHref>
          <a>
            {showBackArrow && (
              <BackArrowIconContainer>
                <ChevronLeft fill="#000" />
              </BackArrowIconContainer>
            )}

            <img
              src="/logo.png"
              alt="T. S. Candee"
              style={{width: 150, height: 650}}
            />
          </a>
        </LogoLink>

        <NavigationMain />

        <NavControls>
          {showBackArrow ? (
            <button
              onClick={() => router.back()}
              title="Navigate back to the homepage"
              aria-label="Navigate back to the homepage"
            >
              <ExIcon fill="#000" />
            </button>
          ) : (
            <>
              <SharePageButton />
            </>
          )}
        </NavControls>
      </NavContainer>
    </div>
  )
}

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1280px) {
    padding-top: 50px;
  }

  @media screen and (max-height: 800px) {
    padding-top: 50px;
  }
`

const NavControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 540px) {
    right: -5px;
  }
`

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform ease-out;
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1280px) {
    display: none;
  }
`

const LogoLink = styled(Link)<{back: string}>`
  position: relative;
  display: flex;
  align-items: center;
  left: ${(p) => (p.back === 'true' ? '-54px' : 0)};

  @media (max-width: 1280px) {
    left: 0;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid #6166dc;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:hover {
    > div {
      transform: translateX(-3px);
    }
  }
`

export default Nav
