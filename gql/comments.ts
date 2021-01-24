import {gql} from 'graphql-request'

export const COMMENTS_BY_POST = gql`
  query FindCommentsByPost($postId: ID!) {
    commentsByPost(postId: $postId, where: {approved: true}) {
      id
      name
      text
      date
      reference_comment {
        id
      }
    }
  }
`

export const SAVE_COMMENT = gql`
  mutation CreateComment($comment: createCommentInput!) {
    createComment(input: $comment) {
      comment {
        id
        name
        text
        date
        reference_comment {
          id
        }
        post {
          slug
        }
      }
    }
  }
`
