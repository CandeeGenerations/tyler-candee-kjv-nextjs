import React from 'react'
import styled from '@emotion/styled'
import LinkIcon from '../icons/link'
import {copyToClipboard} from '../../helpers'

const SharePageButton = () => {
  const [hasCopied, setHasCopied] = React.useState<boolean>(false)
  const fill = '#000'

  function copyToClipboardOnClick() {
    if (hasCopied) return

    copyToClipboard(window.location.href)
    setHasCopied(true)

    setTimeout(() => {
      setHasCopied(false)
    }, 1000)
  }

  return (
    <IconWrapper
      onClick={copyToClipboardOnClick}
      data-a11y="false"
      aria-label="Copy URL to clipboard"
      title="Copy URL to clipboard"
    >
      <LinkIcon fill={fill} />

      <ToolTip hasCopied={hasCopied}>Copied</ToolTip>
    </IconWrapper>
  )
}

const IconWrapper = styled.button`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  &:hover {
    opacity: 1;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid #6166dc;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  @media (max-width: 735px) {
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;

    &:hover {
      opacity: 0.5;
    }
  }
`

const ToolTip = styled.div<{hasCopied: boolean}>`
  position: absolute;
  padding: 4px 13px;
  background: rgba(0, 0, 0, 0.1);
  color: #000;
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  opacity: ${(p) => (p.hasCopied ? 1 : 0)};
  transform: ${(p) => (p.hasCopied ? 'translateY(-3px)' : 'none')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.1);
  }
`

export default SharePageButton
