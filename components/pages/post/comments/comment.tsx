import React from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import NewReply from './newReply'

dayjs.extend(relativeTime)

const Comment = (props) => {
  const {
    comment,
    isChild,
    saveComment,
    noComment,
    newComment,
    successText,
  } = props

  const commentTime = !noComment && !newComment && dayjs(comment.date)

  return (
    <CommentContainer
      style={
        isChild ? {margin: '0 0 20px 60px', borderTop: '1px solid #d8d8db'} : {}
      }
    >
      {noComment ? (
        <CommentSubContainer>
          {successText ? (
            <SuccessText>{successText}</SuccessText>
          ) : (
            <em>No comments yet. Be the first one!</em>
          )}
        </CommentSubContainer>
      ) : newComment ? (
        <div>
          <CommentSubContainer>
            <CommentAuthor>Add your comment now!</CommentAuthor>

            <CommentText>
              We would love to hear what you have to say. Add to the
              conversation by pressing the <em>New Comment</em> button below.
            </CommentText>
          </CommentSubContainer>

          <NewReply saveComment={saveComment} isNew />
        </div>
      ) : (
        <div>
          <CommentSubContainer
            style={isChild ? {paddingLeft: 0, paddingBottom: 0} : {}}
          >
            <CommentAuthor>{comment.name}</CommentAuthor>

            <CommentTime
              title={`${commentTime.format(
                'ddd, MMM D, YYYY',
              )} at ${commentTime.format('h:mm A')}`}
            >
              {commentTime.from(dayjs())}
            </CommentTime>

            <CommentText>{comment.text}</CommentText>
          </CommentSubContainer>

          {comment.childComments && comment.childComments.length > 0 && (
            <div>
              {comment.childComments.map((childComment) => (
                <Comment key={childComment.id} comment={childComment} isChild />
              ))}
            </div>
          )}
        </div>
      )}

      {comment && !comment.reference_comment && (
        <NewReply saveComment={saveComment} referenceComment={comment.id} />
      )}
    </CommentContainer>
  )
}

const CommentContainer = styled.div`
  &:not(:first-of-type) {
    border-top: 1px solid #d8d8db;
  }
`

const CommentSubContainer = styled.div`
  padding: 20px;
`

const CommentAuthor = styled.div`
  display: inline-block;
  color: #3b4145;
  font-weight: bold;
`

const CommentTime = styled.div`
  display: inline-block;
  padding-left: 10px;
  color: #919fa9;
  font-size: 12px;
  font-weight: bold;
`

const CommentText = styled.div`
  margin-top: 20px;
  word-break: break-word;
`

const SuccessText = styled.span`
  color: green;
`

export default Comment
