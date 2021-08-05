import {constrain, max, min} from './mathUtils'
import {PopoverOptions, PopoverRect, PopoverRects} from './types'

export function constrainPopoverPosition(
  opts: PopoverOptions,
  rects: PopoverRects,
  position: PopoverRect
): PopoverRect {
  const {placement} = opts
  const {boundary, popover, reference} = rects

  const minY = min(0, reference.y + reference.height)
  const maxY = max(boundary.height - popover.height, reference.y - popover.height)

  const minX = min(0, reference.x + reference.width)
  const maxX = max(boundary.width - popover.width, reference.x - popover.width)

  if (placement === 'top' || placement === 'bottom') {
    return {
      ...position,
      x: constrain(minX, maxX, position.x),
    }
  }

  if (placement === 'right' || placement === 'left') {
    return {
      ...position,
      y: constrain(minY, maxY, position.y),
    }
  }

  return position
}
