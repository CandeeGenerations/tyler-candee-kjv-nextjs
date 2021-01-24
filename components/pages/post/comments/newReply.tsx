import React, {useState} from 'react'
import styled from '@emotion/styled'
import {getCookie, setCookie} from '../../../../helpers'

const lsName = 'tyler-candee-kjv-comment-name'

const NewReply = (props) => {
  const {isNew = false, saveComment, referenceComment} = props
  const [showReply, setShowReply] = useState(false)
  const [newComment, setNewComment] = useState({
    name: getCookie(lsName),
    comment: '',
  })
  const [loading, setLoading] = useState(false)

  const updateField = (field, value) =>
    setNewComment({...newComment, [field]: value})

  const postComment = async () => {
    setLoading(true)
    setCookie(lsName, newComment.name)

    await saveComment({
      name: newComment.name,
      text: newComment.comment,
      reference_comment: referenceComment,
    })

    setLoading(false)
    setShowReply(false)
    setNewComment({
      name: getCookie(lsName),
      comment: '',
    })
  }

  return (
    <ReplyButtonContainer>
      {showReply && (
        <NewCommentContainer>
          <strong>Post your comment</strong>

          <input
            type="text"
            placeholder="Your name"
            value={newComment.name}
            onChange={(e) => updateField('name', e.target.value)}
          />

          <textarea
            rows={4}
            placeholder="Your comment"
            value={newComment.comment}
            onChange={(e) => updateField('comment', e.target.value)}
          />
        </NewCommentContainer>
      )}

      <ReplyButton onClick={() => setShowReply(!showReply)}>
        {showReply ? 'Cancel' : isNew ? 'New Comment' : 'Reply'}
      </ReplyButton>

      {showReply && (
        <ReplyButton style={{marginLeft: 10}} onClick={postComment}>
          {loading ? 'Posting...' : 'Post Comment'}
        </ReplyButton>
      )}
    </ReplyButtonContainer>
  )
}

const ReplyButtonContainer = styled.div`
  padding: 0 20px 20px 20px;
`

const ReplyButton = styled.button`
  color: #8f9da7;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 5px 10px;
  margin-top: 10px;
`

const NewCommentContainer = styled.div`
  max-width: 600px;

  > input,
  > textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #d8d8db;
  }
`

export default NewReply
