import {useMemo} from 'react'
import {PopoverRects} from './types'
import {useRect} from './useRect'

export function usePopoverRects(refs: {
  boundary?: HTMLElement | 'viewport' | null
  popover: HTMLElement | null
  reference: HTMLElement | null
}): PopoverRects | null {
  const boundaryRect = useRect(refs.boundary || 'viewport')
  const referenceRect = useRect(refs.reference)
  const popoverRect = useRect(refs.popover)

  return useMemo(
    () =>
      boundaryRect &&
      popoverRect &&
      referenceRect && {
        boundary: boundaryRect,
        popover: popoverRect,
        reference: referenceRect,
      },
    [boundaryRect, popoverRect, referenceRect]
  )
}
