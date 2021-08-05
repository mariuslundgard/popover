import {useEffect, useState} from 'react'
import {getRect} from './getRect'
import {getScrollParent} from './getScrollParent'
import {PopoverRect} from './types'

export function useRect(element: HTMLElement | null | 'viewport'): PopoverRect | null {
  const [rect, setRect] = useState<PopoverRect | null>(null)

  useEffect(() => {
    if (!element) return

    const handleScroll = () => {
      setRect(getRect(element))
    }

    handleScroll()

    const scrollParent = element === 'viewport' ? window : getScrollParent(element)

    scrollParent.addEventListener('scroll', handleScroll, {passive: true})

    window.addEventListener('resize', handleScroll)

    return () => {
      scrollParent.removeEventListener('scroll', handleScroll)

      window.removeEventListener('resize', handleScroll)
    }
  }, [element])

  return rect
}
