import {useEffect, useState} from 'react'

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface PopoverRect {
  x: number
  y: number
  width: number
  height: number
}

export interface PopoverRect2 {
  top: number
  left: number
  right: number
  bottom: number
}

export interface PopoverRects {
  boundary: PopoverRect
  reference: PopoverRect
  popover: PopoverRect
}

const EMPTY_RECT: PopoverRect = {x: 0, y: 0, width: 0, height: 0}

const FALLBACK_PLACEMENTS: {[key: string]: PopoverPlacement[] | undefined} = {
  right: ['left', 'top', 'bottom'],
  left: ['right', 'top', 'bottom'],
  bottom: ['top', 'left', 'right'],
  top: ['bottom', 'left', 'right'],
}

function getRect(element: HTMLElement | 'viewport'): PopoverRect {
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

export function useRect(element: HTMLElement | null | 'viewport'): PopoverRect | null {
  const [rect, setRect] = useState<PopoverRect | null>(null)

  useEffect(() => {
    if (!element) return

    const handleScroll = () => {
      setRect(getRect(element))
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {passive: true})
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [element])

  return rect
}

function calcPosition(placement: PopoverPlacement, rects: PopoverRects): PopoverRect {
  const {boundary, popover, reference} = rects
  const maxY = Math.max(boundary.height - popover.height, reference.y - popover.height)

  if (placement === 'top') {
    return {
      x: reference.x + reference.width / 2 - popover.width / 2,
      y: reference.y - popover.height,
      width: popover.width,
      height: popover.height,
    }
  }

  if (placement === 'bottom') {
    return {
      x: reference.x + reference.width / 2 - popover.width / 2,
      y: Math.max(reference.y + reference.height, 0),
      width: popover.width,
      height: popover.height,
    }
  }

  if (placement === 'right') {
    return {
      x: reference.x + reference.width,
      y: Math.min(reference.y + reference.height / 2 - popover.height / 2, maxY),
      width: popover.width,
      height: popover.height,
    }
  }

  if (placement === 'left') {
    return {
      x: reference.x - popover.width,
      y: Math.min(reference.y + reference.height / 2 - popover.height / 2, maxY),
      width: popover.width,
      height: popover.height,
    }
  }

  return EMPTY_RECT
}

export function getOverflow(rects: PopoverRects, position: PopoverRect): PopoverRect2 {
  const {boundary} = rects
  const right = position.x + position.width - (boundary.x + boundary.width)
  const bottom = position.y + position.height - (boundary.y + boundary.height)

  return {
    top: boundary.y - position.y,
    left: boundary.x - position.x,
    right,
    bottom,
  }
}

function getRectCenter(rect: PopoverRect) {
  return [rect.x + rect.width / 2, rect.y + rect.height / 2]
}

function getRectDistance(boundary: PopoverRect, position: PopoverRect) {
  const [x1, y1] = getRectCenter(boundary)
  const [x2, y2] = getRectCenter(position)

  return Math.hypot(x1 - x2, y1 - y2)
}

export function getPosition(
  placement: PopoverPlacement,
  fallbackPlacements: PopoverPlacement[] | null,
  rects: PopoverRects
): PopoverRect {
  const placements = [placement].concat(fallbackPlacements || FALLBACK_PLACEMENTS[placement] || [])
  const len = placements.length

  let i = 0
  let matchDist = -1
  let matchPos: PopoverRect | null = null

  while (i < len) {
    const pos = calcPosition(placements[i], rects)
    const overflow = getOverflow(rects, pos)

    if (overflow.left > 0 || overflow.right > 0 || overflow.top > 0 || overflow.bottom > 0) {
      const distance = getRectDistance(rects.boundary, pos)

      if (matchDist === -1 || distance < matchDist) {
        matchDist = distance
        matchPos = pos
      }

      i += 1
    } else {
      return pos
    }
  }

  if (matchPos) {
    return matchPos
  }

  return calcPosition(placements[0], rects)
}
