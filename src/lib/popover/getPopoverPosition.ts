import {calcPopoverPosition} from './calcPopoverPosition'
import {constrainPopoverPosition} from './constrainPopoverPosition'
import {getOverflow} from './getOverflow'
import {getRectDistance} from './getRectDistance'
import {PopoverOptions, PopoverRect, PopoverRects} from './types'

export function getPopoverPosition(opts: PopoverOptions, rects: PopoverRects): PopoverRect {
  const {fallbackPlacements, placement} = opts
  const placements = [placement].concat(fallbackPlacements || [])
  const len = placements.length

  let i = 0
  let matchDist = -1
  let matchPos: PopoverRect | null = null

  while (i < len) {
    const _opts = {...opts, placement: placements[i]}
    const pos = calcPopoverPosition(_opts, rects)
    const constrainedPos = constrainPopoverPosition(_opts, rects, pos)
    const overflow = getOverflow(rects.boundary, constrainedPos)

    if (overflow.left > 0 || overflow.right > 0 || overflow.top > 0 || overflow.bottom > 0) {
      const distance = getRectDistance(rects.boundary, pos)

      if (matchDist === -1 || distance < matchDist) {
        matchDist = distance
        matchPos = constrainedPos
      }

      i += 1
    } else {
      return constrainedPos
    }
  }

  if (matchPos) {
    return matchPos
  }

  const _opts = {...opts, placement: placements[0]}
  const pos = calcPopoverPosition(_opts, rects)
  const constrainedPos = constrainPopoverPosition(_opts, rects, pos)

  return constrainedPos
}
