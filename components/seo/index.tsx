import {DetailedHTMLProps} from 'react'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'

const SEO = ({
  title,
  description,
  children,
  url,
  image,
  published,
  pathname,
  timeToRead,
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER
  const twitter = twitterHandle && `https://twitter.com/${twitterHandle}`
  const fullURL = (path: string) => (path ? `${siteUrl}${path}` : siteUrl)

  // If no image is provided lets looks for a default novela static image
  image = image ? image : '/preview.jpg'

  const metaTags: DetailedHTMLProps<any, any>[] = [
    {charset: 'utf-8'},
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#fff',
    },
    {
      rel: 'canonical',
      href: fullURL(pathname),
    },
    {itemprop: 'name', content: title || 'T. S. Candee'},
    {itemprop: 'description', content: description},
    {itemprop: 'image', content: fullURL(image)},
    {name: 'description', content: description},

    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:site', content: 'T. S. Candee'},
    {name: 'twitter:title', content: title || 'T. S. Candee'},
    {name: 'twitter:description', content: description},
    {name: 'twitter:creator', content: twitter},
    {
      name: 'twitter:image',
      content: fullURL(image),
    },

    {property: 'og:title', content: title || 'T. S. Candee'},
    {property: 'og:url', content: url},
    {property: 'og:image', content: fullURL(image)},
    {property: 'og:description', content: description},
    {property: 'og:site_name', content: 'T. S. Candee'},
  ]

  if (published) {
    metaTags.push({name: 'article:published_time', content: published})
  }

  if (timeToRead) {
    metaTags.push({name: 'twitter:label1', value: 'Reading time'})
    metaTags.push({name: 'twitter:data1', value: `${timeToRead} min read`})
  }

  return (
    <Helmet
      title={`${title} | ${siteTitle}` || siteTitle}
      htmlAttributes={{lang: 'en'}}
      meta={metaTags}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Merriweather:700,700i&display=swap"
        rel="stylesheet"
      />
      {children}
    </Helmet>
  )
}

export default SEO
