import {Card, studioTheme, Theme, ThemeColorProvider, ThemeProvider} from '@sanity/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import {createGlobalStyle, css} from 'styled-components'
import {App} from './app'
import {LocationProvider} from './lib/location'

const GlobalStyle = createGlobalStyle(({theme}: {theme: Theme}) => {
  const color = theme.sanity.color.base

  return css`
    html,
    body,
    #root {
      height: 100%;
    }
    body {
      -webkit-font-smoothing: antialiased;
      background-color: ${color.bg};
      color: ${color.fg};
      margin: 0;
    }
  `
})

ReactDOM.render(
  <LocationProvider>
    <ThemeProvider theme={studioTheme}>
      <ThemeColorProvider tone="transparent">
        <GlobalStyle />
      </ThemeColorProvider>
      <Card style={{minHeight: '100%'}}>
        <App />
      </Card>
    </ThemeProvider>
  </LocationProvider>,
  document.getElementById('root')
)
