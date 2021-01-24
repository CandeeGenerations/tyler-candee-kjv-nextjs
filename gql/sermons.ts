import {gql} from 'graphql-request'

export const SERMONS_COUNT = gql`
  query {
    sermonsCount
  }
`

export const SERMON_CODES = gql`
  query {
    sermons {
      id
      code
    }
  }
`

const sermonFragment = gql`
  fragment SermonFragement on Sermon {
    id
    title
    code
    date
    hero {
      url
      width
      height
    }
  }
`

export const ALL_SERMONS = gql`
  query allSermons($start: Int = 0) {
    sermons(limit: 6, start: $start, sort: "date:desc") {
      ...SermonFragement
    }
  }
  ${sermonFragment}
`

export const SERMON_BY_CODE = gql`
  query SermonByCode($code: String!) {
    sermons(where: {code: $code}) {
      ...SermonFragement
    }
  }
  ${sermonFragment}
`
