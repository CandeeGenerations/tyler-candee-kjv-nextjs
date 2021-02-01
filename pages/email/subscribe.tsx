import Layout from '../../components/layout'
import Headings from '../../components/postComponents/headings'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../../helpers/contants'
import ButtonLink from '../../components/buttonLink'

const SubscribeConfirm = () => {
  return (
    <Layout>
      <Helmet title={`Subscription Confirmed | ${siteTitle}`} />

      <div className="mt-24 mx-10 md:mx-0">
        <Headings.h1>Subscription Confirmed!</Headings.h1>

        <p className="py-10">
          Thank you for subscribing to my email notifications. You will receive
          an email whenever publish a new post.
        </p>

        <ButtonLink href="/">Go Home</ButtonLink>
      </div>
    </Layout>
  )
}

export default SubscribeConfirm
