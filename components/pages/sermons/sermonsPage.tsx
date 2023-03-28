import {SermonsContext} from '../../../pages/sermons'
import Layout from '../../layout'
import H1 from '../../typography/heading1'
import Pagination from '../../pagination'
import React from 'react'
import Post from '../home/post'
import ButtonLink from '../../buttonLink'

const SermonsPage = ({devotionals = false}) => {
  const {sermons} = React.useContext(SermonsContext)
  const keyword = devotionals ? 'devotionals' : 'sermons'

  return (
    <Layout>
      <div className="max-w-2xl my-32 lg:px-0 px-4">
        <H1>Watch some {keyword} from T. S. Candee today!</H1>
      </div>

      <div className="flex flex-row gap-4 justify-center mb-12">
        <ButtonLink href="/sermons" noBackground={devotionals}>
          Sermons
        </ButtonLink>

        <ButtonLink href="/devotionals" noBackground={!devotionals}>
          Devotionals
        </ButtonLink>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:px-0 px-4">
        {sermons.map((sermon, index) => (
          <Post key={index} data={sermon} route={keyword} />
        ))}
      </div>

      <Pagination route={keyword} context={SermonsContext} />
    </Layout>
  )
}

export default SermonsPage
