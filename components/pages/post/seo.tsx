import React from 'react'
import {getDate, getImageUrl} from '../../../helpers'
import readingTime from '../../../helpers/readingTime'
import SEO from '../../seo'

const PostSEO = ({post, location}) => {
  const authorData = {
    '@type': 'Person',
    name: post.author.name,
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  /**
   * For some reason `location.href` is undefined here when using `yarn build`.
   * That is why I am using static query `allSite` to get needed fields: name & siteUrl.
   */
  let microdata = `{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${siteUrl}${location.pathname}"
    },
    "headline": "${post.title}",
    "image": "${getImageUrl(post.hero.url)}",
    "datePublished": "${post.date}",
    "dateModified": "${post.date}",
    "author": ${JSON.stringify(authorData)},
    "description": "${post.excerpt.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "Tyler Candee",
      "logo": {
        "@type": "ImageObject",
        "url": "${siteUrl}/icons/icon-512x512.png"
      }
    }
  }
`.replace(/"[^"]+"|(\s)/gm, function (matched, group1) {
    if (!group1) {
      return matched
    } else {
      return ''
    }
  })
  /**
   * See here for the explanation of the regex above:
   * https://stackoverflow.com/a/23667311
   */

  return (
    <SEO
      title={post.title}
      description={post.excerpt}
      image={post.hero.url}
      timeToRead={readingTime(post.body)}
      published={getDate(post.date)}
      pathname={location.href}
      url={location.href}
    >
      <script type="application/ld+json">{microdata}</script>
    </SEO>
  )
}

export default PostSEO
