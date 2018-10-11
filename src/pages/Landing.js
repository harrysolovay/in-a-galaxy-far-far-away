import React from 'react'
import { connect } from 'store'
import { ListContainer, ListItem } from 'components'

export default connect(({ $: { characters } }) => (
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
))