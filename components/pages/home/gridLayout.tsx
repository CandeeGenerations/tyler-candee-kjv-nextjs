import React from 'react'
import {getCookie, setCookie} from '../../../helpers'

export const GridLayoutContext = React.createContext<any>({})

const GridLayout = ({children}) => {
  const [layout, setLayout] = React.useState('tiles')
  const tiles = layout === 'tiles'

  React.useEffect(() => {
    setLayout(getCookie('gridLayout') || 'tiles')
  }, [])

  const changeLayout = (newLayout) => {
    setLayout(newLayout)
    setCookie('gridLayout', newLayout)
  }

  return (
    <GridLayoutContext.Provider
      value={{
        layout,
        tiles,
        changeLayout,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  )
}

export default GridLayout
