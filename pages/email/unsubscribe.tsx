import Layout from '../../components/layout'
import Headings from '../../components/postComponents/headings'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'
import ButtonLink from '../../components/buttonLink'

const UnsubscribeConfirm = () => {
  return (
    <Layout>
      <Helmet title={`Unsubscribed | ${siteTitle}`} />

      <div className="mt-24 mx-10 md:mx-0">
        <Headings.h1>You are now unsubscribed</Headings.h1>

        <p className="py-10">
          I'm sorry to see you go. I hope that you will continue to find value
          in the content on my site.
        </p>

        <ButtonLink href="/">Go Home</ButtonLink>
      </div>
    </Layout>
  )
}

export default UnsubscribeConfirm
