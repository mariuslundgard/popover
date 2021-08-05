import type {LocationState} from './types'

const qs = {
  parse(str: string) {
    const params = new URLSearchParams('?' + str)
    const q: Record<string, string> = {}

    params.forEach((value, key) => {
      q[key] = value
    })

    return {}
  },

  stringify(q: Record<string, string>) {
    return Object.entries(q)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  },
}

export function getStateFromWindow(): LocationState {
  const query = qs.parse(window.location.search.substr(1))

  return {
    path: window.location.pathname,
    query,
    title: window.document.title,
  }
}

export function getNewState(state: LocationState, params: LocationState): LocationState {
  return {
    path: params.path || '/',
    title: params.title || state.title,
    query: params.query || {},
  }
}

export function getUrlFromState(state: LocationState): string {
  const searchString = qs.stringify(state.query)

  if (searchString) {
    return `${state.path}?${searchString}`
  }

  return state.path
}
