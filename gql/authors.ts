import {gql} from 'graphql-request'

export const FEATURED_AUTHOR = gql`
  query {
    authors(limit: 1, where: {featured: true}) {
      slug
      name
      bio
      avatar {
        url
      }
    }
  }
`

export const AUTHORS_SLUGS = gql`
  query {
    authorSlugs {
      id
      slug
      postCount
    }
  }
`

export const GET_AUTHOR_BY_SLUG = gql`
  query($slug: String!) {
    authors(limit: 1, where: {slug: $slug}) {
      id
      name
      bio
      slug
      social {
        facebook
        instagram
        twitter
        linkedin
        youtube
      }
      avatar {
        url
      }
    }
  }
`
