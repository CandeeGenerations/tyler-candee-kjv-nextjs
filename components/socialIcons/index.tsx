import Icon from './icon'
import React from 'react'

export type NetworkType =
  | 'youtube'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'twitter'

const SocialIcons = ({networkList}) => {
  const networks: NetworkType[] = [
    'facebook',
    'instagram',
    'twitter',
    'youtube',
    'linkedin',
  ]

  return (
    <div className="flex flex-grow-0">
      {networks.map((network, index) => (
        <Icon
          className={index > 0 && 'ml-9'}
          network={network}
          key={index}
          slug={networkList[network]}
        />
      ))}
    </div>
  )
}

export default SocialIcons
