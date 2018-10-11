import React from 'react'
import styled from 'styled-components'
import { animations } from 'utilities'

const Container = styled.div`
  display: block;
  width: 100%;
  margin: 0px auto;
  text-align: center;
  > img {
    width: 30px;
    animation: ${ animations.spin } infinite 1.375s linear;
  }
`

export default () =>
  <Container>
    <img
      src={ require('assets/images/spinner.png') }
      alt='loading spinner'
    />
  </Container>