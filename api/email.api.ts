import axios from 'axios'

export const sendEmail = (url, data) => {
  const emailUrl = process.env.NEXT_PUBLIC_EMAIL_SERVER

  if (!emailUrl) {
    return
  }

  axios.post(`${emailUrl}${url}`, {
    to: process.env.NEXT_PUBLIC_TO_EMAIL,
    data: {
      ...data,
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
      serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    },
  })
}
