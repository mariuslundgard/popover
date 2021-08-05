import {PopoverRect} from './types'

export function getRect(element: HTMLElement | 'viewport'): PopoverRect {
  if (element === 'viewport') {
    const width = window.innerWidth
    const height = window.innerHeight

    return {
      x: 0,
      y: 0,
      width,
      height,
    }
  }

  const domRect = element.getBoundingClientRect()

  return {
    x: domRect.left,
    y: domRect.top,
    width: domRect.width,
    height: domRect.height,
  }
}
