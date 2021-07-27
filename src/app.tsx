import React, {createElement} from 'react'
import {BasicTest} from './test/basic'

const routes = [{name: 'basic', component: BasicTest}]

export function App() {
  const route = routes.find((r) => r.name)

  if (route) {
    return createElement(route.component)
  }

  return <div>No match</div>
}
