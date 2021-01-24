module.exports = {
  images: {
    domains: ['localhost'],
  },
  env: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    social: {
      facebook: process.env.NEXT_PUBLIC_FACEBOOK,
      twitter: process.env.NEXT_PUBLIC_TWITTER,
      instagram: process.env.NEXT_PUBLIC_INSTAGRAM,
      linkedin: process.env.NEXT_PUBLIC_LINKEDIN,
      youtube: process.env.NEXT_PUBLIC_YOUTUBE,
    },
  },
}
