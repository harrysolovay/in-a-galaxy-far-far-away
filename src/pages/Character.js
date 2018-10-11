import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { Redirect, withRouter } from 'react-router-dom'
import { connect, LOADING, LOADED, ERROR } from 'store'
import { ListContainer, ListItem, Header, Loading } from 'components'
import moment from 'moment'

const Button = styled.button`
  appearance: none;
  border: 1px solid #e9e9e9;
  background-color: transparent;
  font-size: 14px;
  padding: 5px 30px;
  outline: none;
  cursor: pointer;
  margin-bottom: 33px;
`

const BackButton = withRouter(
  ({ history: { goBack } }) => (
    <Button
      children={ `<` }
      onClick={ goBack }
    />
  )
)

export default connect(
  class extends PureComponent {

    render() {

      const { characters } = this.props.$
      const { i } = this.props.match.params
      const character = characters[i]

      if (!character) return <Redirect to='/4/0/4' />

      const { name, status, films } = character

      return (
        <Fragment>
          <Header>
            <h1 children={ name } />
            <BackButton />
          </Header>
          {(() => {
            switch (status) {

              case LOADING: {
                return <Loading />
              }

              case LOADED: {
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
                const otherResource = `https://www.starwars.com/search?q=${ name.split(' ').join('%20') }`
                return (
                  <ListContainer>
                    <ListItem
                      title='Technical difficulties. Check out...'
                      subtitle={ otherResource }
                      href={ otherResource }
                    />
                  </ListContainer>
                )
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