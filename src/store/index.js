import React, { PureComponent, createContext } from 'react'
import { characters } from './characters.json'

// to avoid prop-drilling
const context = createContext({})

// loading states
export const UNTOUCHED = 'UNTOUCHED'
export const LOADING = 'LOADING'
export const LOADED = 'LOADED'
export const ERROR = 'ERROR'

// default each character's loading state to `UNTOUCHED`
const INITIAL_STATE = {
  characters: characters.map(
    character => ({
      ...character,
      status: UNTOUCHED,
      films: [],
    })
  ),
}

export class Provider extends PureComponent {

  state = { ...INITIAL_STATE }

  // pure function + used in non-default switch cases below
  updateCharacter = (lastState, i, newProps) => {
    const { characters: lastCharacters } = lastState
    const characterWithNewProps = Object.assign({}, lastCharacters[i], newProps)
    const characters = Object.assign([], lastCharacters, { [i]: characterWithNewProps })
    return { ...lastState, characters }
  }

  // pure, other than setState calls (functional setState as recommended)
  loadCharacter = async(i) => {

    // will be null if does not exist in characters.json
    const { [i]: character } = this.state.characters

    // if not null, and not yet loaded (incase we wanted to implement a localStorage or cookie strategy)...
    if (character && character.status === UNTOUCHED) {

      // make sure the latter setState isn't overriden with improbable execution timing
      await new Promise(resolve => {
        this.setState(lastState => ({
          ...this.updateCharacter(lastState, i, {
            status: LOADING,
          })
        }), resolve)
      })

      // make the request
      const response = await fetch(character.url)
      switch (response.status) {

        // resource not found / invalid request
        case 404: {
          return this.setState(lastState => ({
            // with new status (ERROR)
            ...this.updateCharacter(lastState, i, {
              status: ERROR,
            })
          }))
        }

        case 200: {

          // retrieve films from response
          const stringified = await response.text()
          const { films: filmUrls } = JSON.parse(stringified)

          const films = await Promise.all(
            filmUrls.map(async(url) => {
              const response = await fetch(url)
              // return false to filter out request errors...
              // depending on UX-constraints, might want to display "errored" films

              const { status } = response
              if (status === 404) {
                return false
              }

              const stringified = await response.text()
              return JSON.parse(stringified)
            }).filter(Boolean)
          )

          return this.setState(lastState => {
            const status = LOADED
            return this.updateCharacter(lastState, i, { films, status })
          })
          
        }

        default: {
          // we should never hit this case.
          // in production, add analytics to track how / if ever hit
          console.error('the server is acting wonky')
          break
        }
      }
    }
  }

  getRenderProps = () => {
    const { props, state, loadCharacter } = this
    return { ...props, value: { ...state, loadCharacter } }
  }

  render() {
    const { getRenderProps } = this
    return <context.Provider { ...getRenderProps() } />
  }

}

// eslint-disable-next-line
const { Consumer, ...rest } = context

// allows us to use consumer render props in Target's lifecycle methods
export const connect = (Target) =>
  (props) =>
    <Consumer>
      {(store) => (
        <Target
          { ...props }
          $={ store }
        />
      )}
    </Consumer>