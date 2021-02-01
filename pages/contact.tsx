import Layout from '../components/layout'
import {Helmet} from 'react-helmet'
import {siteTitle} from '../helpers/contants'
import React from 'react'
import styled from '@emotion/styled'
import H1 from '../components/typography/heading1'
import ButtonLink from '../components/buttonLink'
import Checkmark from '../components/icons/checkmark'
import {sendEmail} from '../api/email.api'

const Contact = () => {
  const [fields, setFields] = React.useState({name: '', email: '', message: ''})
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(false)

  const updateField = (field, value) => setFields({...fields, [field]: value})

  const contact = async (e) => {
    e.preventDefault()

    const formFields = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    }

    if (!formFields.name || !formFields.email || !formFields.message) {
      setError('All fields are required.')
      return
    }

    setError(null)
    setLoading(true)

    await sendEmail('/contact', formFields)

    setLoading(false)
    setSuccess(true)
  }

  return (
    <Layout>
      <Helmet title={`Contact | ${siteTitle}`} />

      <div className="max-w-2xl my-32 lg:px-0 px-4">
        <H1>Contact Tyler Candee</H1>
      </div>

      <Wrapper className="rounded-lg p-10 relative shadow-xl">
        {success ? (
          <div className="flex flex-col gap-4 items-center">
            <Checkmark />

            <p className="text-green-600 mt-5">Your message has been sent!</p>

            <div className="pt-10">
              <ButtonLink href="/">Go Home</ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-2">Send me a message so we can connect!</p>

            {error && <p className="text-red-600 my-5">{error}</p>}

            <form onSubmit={contact} className="flex flex-col mt-5">
              <Input
                className="rounded-full py-2 px-6 lg:col-span-2"
                type="text"
                placeholder="Your name"
                name="name"
                required
                onChange={({target}) => updateField('name', target.value)}
              />

              <Input
                className="rounded-full py-2 px-6 lg:col-span-2 mt-5"
                type="email"
                placeholder="Your email address"
                name="email"
                required
                onChange={({target}) => updateField('email', target.value)}
              />

              <TextInput
                rows={4}
                required
                placeholder="Your message"
                name="message"
                className="rounded-3xl py-2 px-6 lg:col-span-2 my-5"
                onChange={({target}) => updateField('message', target.value)}
              />

              <ButtonLink submit>{loading ? 'Loading...' : 'Send'}</ButtonLink>
            </form>
          </>
        )}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  max-width: 800px;
  border: 1px solid #dddddd;
  background: linear-gradient(180deg, #f1f1f1 0%, #fefefe 91.01%);
`

const Input = styled.input`
  min-height: 56px;
  border: 1px solid #dddddd;
`

const TextInput = styled.textarea`
  min-height: 56px;
  border: 1px solid #dddddd;
`

export default Contact
