import axios from 'axios'

export const sendEmail = (data) => {
  const emailUrl = process.env.NEXT_PUBLIC_EMAIL_SERVER

  if (!emailUrl) {
    return
  }

  axios.post(`${emailUrl}/v2/new-comment`, {
    to: process.env.NEXT_PUBLIC_TO_EMAIL,
    data: {
      ...data,
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
      serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    },
  })
}
