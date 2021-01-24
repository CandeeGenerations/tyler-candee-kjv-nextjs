import {gql} from 'graphql-request'

export const TAGS_SLUGS = gql`
  query {
    tagSlugs {
      id
      slug
      postCount
    }
  }
`

export const GET_TAG_BY_SLUG = gql`
  query($slug: String!) {
    tags(limit: 1, where: {slug: $slug}) {
      id
      slug
      tag
      featured
    }
  }
`

export const FEATURED_TAGS = gql`
  query {
    tags(sort: "order:asc", where: {featured: true}) {
      id
      tag
      slug
      order
    }
  }
`
