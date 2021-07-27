import {useEffect, useState} from 'react'

export interface PopoverRect {
  top: number
  right: number
  bottom: number
  left: number

  width: number
  height: number
}

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface PopoverStyle {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

const EMPTY_STYLE: PopoverStyle = {}

export function useRect(element: HTMLElement | null) {
  const [rect, setRect] = useState<PopoverRect | null>(null)

  useEffect(() => {
    if (!element) return

    const handleScroll = () => {
      const r = element.getBoundingClientRect()
      // const scrollTop = window.pageYOffset

      setRect({
        top: r.top, //+ scrollTop,
        right: r.right,
        bottom: r.bottom, //+ scrollTop,
        left: r.left,
        width: r.width,
        height: r.height,
      })
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [element])

  return rect
}

export function getPlacementStyle(
  placement: PopoverPlacement,
  refRect: PopoverRect | null,
  popRect: PopoverRect | null
): PopoverStyle {
  if (!refRect || !popRect) return EMPTY_STYLE

  if (placement === 'bottom') {
    return {
      left: refRect.left + refRect.width / 2 - popRect.width / 2,
      top: Math.max(refRect.bottom, 0),
    }
  }

  return EMPTY_STYLE
}
