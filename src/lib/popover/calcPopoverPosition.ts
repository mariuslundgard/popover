import {EMPTY_RECT} from './constants'
import {PopoverOptions, PopoverRect, PopoverRects} from './types'

export function calcPopoverPosition(opts: PopoverOptions, rects: PopoverRects): PopoverRect {
  const {distance = 0, placement} = opts
  const {popover, reference} = rects
  const {width, height} = popover

  const _halfRefW = reference.width / 2
  const _halfRefH = reference.height / 2
  const _halfW = width / 2
  const _halfH = height / 2

  if (placement === 'top') {
    const x = reference.x + _halfRefW - _halfW
    const y = reference.y - height - distance

    return {x, y, width, height}
  }

  if (placement === 'bottom') {
    const x = reference.x + _halfRefW - _halfW
    const y = reference.y + reference.height + distance

    return {x, y, width, height}
  }

  if (placement === 'right') {
    const x = reference.x + reference.width + distance
    const y = reference.y + _halfRefH - _halfH

    return {x, y, width, height}
  }

  if (placement === 'left') {
    const x = reference.x - width - distance
    const y = reference.y + _halfRefH - _halfH

    return {x, y, width, height}
  }

  return EMPTY_RECT
}
