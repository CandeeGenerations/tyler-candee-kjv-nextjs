import React from 'react'
import styled from '@emotion/styled'
import Headings from '../../postComponents/headings'
import ButtonLink from '../../buttonLink'
import {subscribe} from '../../../api/moosend.api'
import {useRouter} from 'next/router'

const Subscribe = ({className = ''}) => {
  const [email, setEmail] = React.useState('')
  const [buttonText, setButtonText] = React.useState('Sign Up')
  const router = useRouter()

  const signUp = async (e) => {
    e.preventDefault()
    setButtonText('Loading...')
    await subscribe(email)
    await router.push('email/subscribe')
  }

  return (
    <Wrapper className={`rounded-lg p-10 relative shadow-xl ${className}`}>
      <Headings.h2>Subscribe for updates</Headings.h2>

      <p className="mt-2">Get email updates when new posts go up!</p>

      <form
        onSubmit={signUp}
        className="grid grid-col-1 lg:grid-cols-3 gap-4 mt-10"
      >
        <Input
          className="rounded-full py-2 px-6 lg:col-span-2"
          type="email"
          placeholder="Your email address"
          name="email"
          required
          onChange={({target}) => setEmail(target.value)}
        />

        <ButtonLink submit>{buttonText}</ButtonLink>
      </form>
    </Wrapper>
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

export default Subscribe
