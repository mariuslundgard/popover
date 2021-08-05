export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface PopoverRect {
  x: number
  y: number
  width: number
  height: number
}

export interface PopoverPosition {
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

export interface PopoverOptions {
  distance?: number
  placement: PopoverPlacement
  fallbackPlacements?: PopoverPlacement[]
}
