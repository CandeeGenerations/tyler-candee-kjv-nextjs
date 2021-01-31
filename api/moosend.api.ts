import axios from 'axios'

export const subscribe = (email) => {
  const apiUrl = process.env.NEXT_PUBLIC_MOOSEND_API_URL
  const mailingListId = process.env.NEXT_PUBLIC_MOOSEND_MAILING_LIST_ID
  const apiKey = process.env.NEXT_PUBLIC_MOOSEND_API_KEY

  if (!apiUrl || !mailingListId || !apiKey) {
    return
  }

  axios.post(
    `${apiUrl}/subscribers/${mailingListId}/subscribe.json?apikey=${apiKey}`,
    {
      email,
    },
  )
}
