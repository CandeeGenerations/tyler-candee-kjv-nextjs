import {gql} from 'graphql-request'

export const RESOURCE_COUNT = gql`
  query {
    resourceCount
  }
`

export const resourceFragment = gql`
  fragment ResourceFragment on Resource {
    id
    title
    link
    description
  }
`

export const ALL_RESOURCES = gql`
  query allResources($start: Int = 0) {
    resources(limit: 10, start: $start, sort: "title:asc") {
      ...ResourceFragment
    }
  }
  ${resourceFragment}
`
