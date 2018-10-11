import React from 'react'
import { setGlobalStyles, registerServiceWorker } from 'utilities'
import { Landing, Character, FourOFour } from 'pages'
import { Provider } from 'store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { render } from 'react-dom'

setGlobalStyles()

const routes = [{
  key: 'landing',
  exact: true,
  path: '/',
  component: Landing,
}, {
  key: 'character',
  exact: true,
  path: '/:i',
  component: Character,
}, {
  key: 'fourOFour',
  component: FourOFour,
}]

const App = () =>
  <Provider>
    <BrowserRouter>
      <Switch>
        {
          routes.map(route => (
            <Route { ...route } />
          ))
        }
      </Switch>
    </BrowserRouter>
  </Provider>

const rootElement = document.getElementById('root')
if (rootElement) {
  render(<App />, rootElement)
  registerServiceWorker()
}