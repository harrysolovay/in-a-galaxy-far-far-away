import React from 'react'
import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'

const Outer = styled.div`
  padding: 5px;
  > * {
    border: 1px solid #ddd;
    background-color: rgb(250, 250, 250);
  }
`

const Inner = styled.div`
  padding: 15px;
`

const Text = styled.span`
  display: block;
`

const Link = styled(UnstyledLink)`
  display: block;
`

const Anchor = styled.a`
  display: block;
`

const Title = styled(Text)`
  font-size: 1.25em;
`

const Subtitle = styled(Text)`
  margin-top: .25em;
  font-size: 1em;
  line-height: 1.375em;
`

export default ({ title, subtitle, i, href }) => {

  const children = (
    <Inner>
      <Title children={ title } />
      {
        subtitle &&
          <Subtitle children={ subtitle } />
      }
    </Inner>
  )

  return (
    <Outer>
      {
        typeof i === 'number'
          ? <Link
              to={ `/${ i }` }
              { ...{ children }}
            />
          : href
            ? <Anchor
                href={ href }
                target='_blank'
                rel='noopener noreferrer'
                { ...{ children }}
              />
            : children
      }
    </Outer>
  )

}