import React from 'react'
import styled from '@emotion/styled'
import {PostContext} from '../../../../pages/[slug]'
import Comment from './comment'
import {getGQLClient} from '../../../../gql/request'
import {SAVE_COMMENT} from '../../../../gql/comments'
import dayjs from 'dayjs'
import {sendNewCommentSlackMessage} from '../../../../api/slack.api'
import {sendEmail} from '../../../../api/email.api'

const Comments = () => {
  const [gqlClient] = React.useState(getGQLClient())
  const {post, comments} = React.useContext(PostContext)
  const [success, setSuccess] = React.useState(false)

  const saveComment = async (data) => {
    const response = await gqlClient.request(SAVE_COMMENT, {
      comment: {
        data: {
          ...data,
          post: post.id,
          approved: false,
          date: dayjs().format(),
        },
      },
    })
    const {comment} = response.createComment

    sendNewCommentSlackMessage(comment)
    sendEmail('/v2/new-comment', comment)
    setSuccess(true)
  }

  return (
    <CommentsSection>
      <CommentsBorder />

      <CommentsHeader>Comments</CommentsHeader>

      <CommentsContainer>
        {comments.keys.length > 0 ? (
          comments.keys.map((key) => {
            const comment = comments.data[key]

            return (
              <Comment
                key={comment.id}
                comment={comment}
                saveComment={saveComment}
              />
            )
          })
        ) : (
          <Comment saveComment={saveComment} noComment />
        )}

        {success && (
          <Comment
            successText="Thank you for your comment. We have received it and will approve it shortly."
            noComment
          />
        )}

        <Comment saveComment={saveComment} newComment />
      </CommentsContainer>
    </CommentsSection>
  )
}

const CommentsSection = styled.div`
  padding: 50px 0 50px;
  margin: 0 auto;
  max-width: 1140px;
  width: 100%;

  @media (max-width: 1220px) and (min-width: 736px) {
    padding-right: 68px;
  }
`

const CommentsBorder = styled.div`
  border-bottom: 1px solid #d8d8db;
  margin-bottom: 20px;
`

const CommentsHeader = styled.h3`
  font-family: 'Merriweather', Georgia, Serif;
  font-size: 22px;
  line-height: 1.4;
  font-weight: bold;
  max-width: 100% !important;

  @media (max-width: 735px) {
    padding: 0 20px;
  }
`

const CommentsContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #d8d8db;
  background-color: #fff;

  @media (max-width: 735px) {
    border-radius: 0;
    border-right: 0;
    border-left: 0;
  }
`

export default Comments
