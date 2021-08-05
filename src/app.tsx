import {Stack, Text} from '@sanity/ui'
import React, {createElement} from 'react'
import {useLocation} from './lib/location'
import {BasicTest} from './test/basic'
import {ContainerTest} from './test/container'

const routes = [
  {path: '/basic', component: BasicTest},
  {path: '/container', component: ContainerTest},
]

export function App(): React.ReactElement {
  const loc = useLocation()
  const route = routes.find((r) => r.path === loc.path)

  if (route) {
    return createElement(route.component)
  }

  if (loc.path === '/') {
    return (
      <Stack padding={4} space={3}>
        {routes.map((route) => (
          <Text key={route.path}>
            <a href={route.path} onClick={loc.handleLinkClick}>
              {route.path}
            </a>
          </Text>
        ))}
      </Stack>
    )
  }

  return <div>No match</div>
}
