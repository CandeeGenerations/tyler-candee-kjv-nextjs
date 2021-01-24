import {GraphQLClient} from 'graphql-request'

export const getGQLClient = () =>
  new GraphQLClient(`${process.env.serverUrl}/graphql`)
