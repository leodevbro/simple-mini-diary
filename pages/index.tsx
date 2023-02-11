import React from 'react'
import tw from 'twin.macro'
import { Button, Logo } from './../components'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`,
  ],
}

const IndexPage = () => (
  <div css={[styles.container({ hasBackground: true })]}>
    <div tw="flex flex-col justify-center h-full gap-y-5 md:accent-amber-50">
      <Button variant="primary">Submit</Button>
      <Button variant="secondary">Cancel</Button>
      <Button isSmall>Close</Button>
    </div>
    <Logo />
    <p style={{ fontSize: '1rem' }}>444444444</p>
  </div>
)

export default IndexPage
