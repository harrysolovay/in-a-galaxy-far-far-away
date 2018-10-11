import React from 'react'
import { connect } from 'store'
import { Header, ListContainer, ListItem } from 'components'

export default connect(({ $: { characters } }) => (
  <div>
    <Header>
      <h1 children='in a galaxy far far away' />
    </Header>
    <ListContainer>
      {
        characters.map(({ name }, i) => (
          <ListItem
            key={ name }
            title={ name }
            { ...{ i }}
          />
        ))
      }
    </ListContainer>
  </div>
))