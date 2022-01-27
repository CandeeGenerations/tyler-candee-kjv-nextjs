import React from 'react'
import Layout from '../../layout'
import {PostsContext} from '../../../pages'
import Pagination from '../../pagination'
import styled from '@emotion/styled'
import Subscribe from '../home/subscribe'
import ButtonLink from '../../buttonLink'
import Headings from '../../postComponents/headings'

const ResourcesPage = () => {
  const resourcesContext = React.useContext(PostsContext)

  return (
    <Layout>
      <div className="mt-24 mx-10 md:mx-0">
        <Headings.h1>Resources</Headings.h1>

        <Bio className="my-0 max-w-3xl mb-14 text-lg">
          There are resources that we use on a daily or weekly basis. We hope
          that you can also find some use from them in your daily Christian
          life.
        </Bio>

        <ul role="list" className="divide-y divide-muted-light space-y-5">
          {resourcesContext.resources.map((resource) => (
            <li key={resource.id}>
              <div className="mt-5 px-4 py-4 flex sm:flex-row flex-col sm:items-center sm:px-6">
                <div className="flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <Headings.h3>{resource.title}</Headings.h3>

                    {resource.description && (
                      <div className="mt-3">
                        <strong>About:</strong>

                        <p>{resource.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:ml-16 sm:mt-0 mt-10 text-center flex-1 w-full sm:w-auto sm:flex-none flex-shrink-0">
                  <ButtonLink anchor href={resource.link}>
                    Visit Site
                  </ButtonLink>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Pagination route="resources" max={10} context={PostsContext} />

        <Subscribe className="mt-16" />
      </div>
    </Layout>
  )
}

const Container = styled.div`
  margin-top: 100px;
  max-width: 75%;
  width: 100%;

  @media screen and (max-width: 735px) {
    max-width: 100%;
  }
`

const Bio = styled.p`
  color: #73737d;
`

export default ResourcesPage
