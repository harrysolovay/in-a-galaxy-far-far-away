import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export default () =>
  <Container>
    <div>
      <h1>404</h1>
      <h3>{ `this link is unavailable` }</h3>
      <Link
        to='/'
        children='click here to go home'
      />
    </div>
  </Container>