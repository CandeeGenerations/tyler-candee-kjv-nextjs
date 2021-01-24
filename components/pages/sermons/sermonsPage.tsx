import {SermonsContext} from '../../../pages/sermons'
import Layout from '../../layout'
import H1 from '../../typography/heading1'
import Pagination from '../../pagination'
import React from 'react'
import Post from '../home/post'

const SermonsPage = () => {
  const {sermons} = React.useContext(SermonsContext)

  return (
    <Layout>
      <div className="max-w-2xl my-32 lg:px-0 px-4">
        <H1>Watch some sermons from Tyler Candee today!</H1>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:px-0 px-4">
        {sermons.map((sermon, index) => (
          <Post key={index} data={sermon} route="sermons" />
        ))}
      </div>

      <Pagination route="sermons" context={SermonsContext} />
    </Layout>
  )
}

export default SermonsPage
