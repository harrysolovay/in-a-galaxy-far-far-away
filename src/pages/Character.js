import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { Redirect, withRouter } from 'react-router-dom'
import { connect, LOADING, LOADED, ERROR } from 'store'
import { ListContainer, ListItem } from 'components'
import moment from 'moment'

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 33px;
  > * {
    padding: 10px;
  }
`

const Button = styled.button`
  appearance: none;
  border: 1px solid #e9e9e9;
  background-color: transparent;
  font-size: 14px;
  padding: 5px 30px;
  outline: none;
  cursor: pointer;
`

const BackButton = withRouter(({ history: { goBack } }) => {
  return (
    <Button
      children={ `<` }
      onClick={ goBack }
    />
  )
})

export default connect(
  class extends PureComponent {

    render() {

      const { characters } = this.props.$
      const { i } = this.props.match.params
      const character = characters[i]
      
      if (!character) return <Redirect to='/4/0/4' />

      return (
        <Fragment>
          <Header>
            <h1>{ character.name }</h1>
            <BackButton />
          </Header>
          {(() => {
            switch (character.status) {

              case LOADING: {
                return (
                  <div>loading</div>
                )
              }

              case LOADED: {
                const { films } = character
                return (
                  <ListContainer>
                    {
                      films.map(({ title, release_date }) => (
                        <ListItem
                          { ...{ title }}
                          subtitle={(() => {
                            const formatted = moment(release_date)
                              .format('dddd, MMM D YYYY')
                            return `Released on ${ formatted }`
                          })()}
                        />
                      ))
                    }
                  </ListContainer>
                )
              }

              case ERROR: {
                return <div>there was an error</div>
              }

              default: {
                return <div>should never hit</div>
              }
            }
          })()}
        </Fragment>
      )
    }

    componentDidMount() {
      const { props } = this
      const { loadCharacter } = props.$
      const { i } = props.match.params
      loadCharacter(i)
    }
  }
)