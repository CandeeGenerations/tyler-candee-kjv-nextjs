import {useRouter} from 'next/router'
import React from 'react'
import {Helmet} from 'react-helmet'
import 'tailwindcss/tailwind.css'
import * as gtag from '../libs/gtag'
import '../styles/globals.css'

function MyApp({Component, pageProps}) {
  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Merriweather:700,700i&display=swap"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Helmet>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
