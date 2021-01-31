import axios from 'axios'

export const sendNewCommentSlackMessage = ({id, post, name, text}) => {
  const slackUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL

  if (!slackUrl) {
    return
  }

  const commentUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/plugins/content-manager/collectionType/application::comment.comment/${id}`

  axios.post(
    slackUrl,
    {
      username: 'Tyler Candee KJV',
      text: 'There is a new comment on your website:',
      attachments: [
        {
          fallback: text,
          fields: [
            {
              title: 'Comment',
              short: false,
              value: `${text} - ${name}`,
            },
          ],
          actions: [
            {
              type: 'button',
              text: 'View Post',
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}`,
            },
            {
              type: 'button',
              text: 'View Comment',
              url: commentUrl,
            },
            {
              type: 'button',
              text: 'Approve Comment',
              style: 'primary',
              url: commentUrl,
            },
          ],
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
}
