import {gql} from 'graphql-request'

export const POSTS_COUNT = gql`
  query {
    postsCount(where: {secret: false})
  }
`

export const POST_SLUGS = gql`
  query {
    posts(publicationState: LIVE) {
      id
      slug
    }
  }
`

export const POSTS_COUNT_BY_AUTHOR = gql`
  query postsCount($authorId: ID!) {
    postsCount(where: {secret: false, author: $authorId})
  }
`

export const POSTS_COUNT_BY_TAG = gql`
  query postsCount($tagId: ID!) {
    postsCount(where: {secret: false, tags_in: [$tagId]})
  }
`

export const postFragment = gql`
  fragment PostFragment on Post {
    id
    secret
    title
    slug
    date
    hero {
      url
      width
      height
    }
    excerpt
    body
    tags {
      id
      slug
      tag
    }
    author {
      id
      name
      bio
      slug
      avatar {
        url
      }
    }
  }
`

export const POST_BY_SLUG = gql`
  query PostBySlug($slug: String!) {
    posts(where: {slug: $slug}) {
      ...PostFragment
    }
  }
  ${postFragment}
`

export const NEXT_POSTS = gql`
  query PostBySlug($id: ID!) {
    nextPosts(id: $id) {
      ...PostFragment
    }
  }
  ${postFragment}
`

export const ALL_POSTS = gql`
  query allPosts($start: Int = 0) {
    posts(limit: 6, start: $start, sort: "date:desc", where: {secret: false}) {
      ...PostFragment
    }
  }
  ${postFragment}
`

export const TODAYS_POSTS = gql`
  query todaysPosts {
    todaysPosts {
      ...PostFragment
    }
  }
  ${postFragment}
`

export const AUTHOR_POSTS = gql`
  query posts($start: Int = 0, $authorId: ID!, $limit: Int = 6) {
    posts(
      limit: $limit
      start: $start
      sort: "date:desc"
      publicationState: LIVE
      where: {secret: false, author: $authorId}
    ) {
      ...PostFragment
    }
  }
  ${postFragment}
`

export const TAG_POSTS = gql`
  query posts($start: Int = 0, $tagId: ID!, $limit: Int = 6) {
    posts(
      limit: $limit
      start: $start
      sort: "date:desc"
      publicationState: LIVE
      where: {secret: false, tags_in: [$tagId]}
    ) {
      ...PostFragment
    }
  }
  ${postFragment}
`
