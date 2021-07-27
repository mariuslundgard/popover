import {Card, studioTheme, ThemeProvider} from '@sanity/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app'

ReactDOM.render(
  <ThemeProvider theme={studioTheme}>
    <Card>
      <App />
    </Card>
  </ThemeProvider>,
  document.getElementById('root')
)
