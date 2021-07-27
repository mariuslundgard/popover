import {Box, Layer, Portal, Text} from '@sanity/ui'
import React, {CSSProperties, useMemo, useState} from 'react'
import styled from 'styled-components'
import {getPosition, PopoverRects, useRect} from '../../lib/popover'

const RefBox = styled(Box)`
  background: lightgreen;
  border: 1px solid currentColor;
  position: absolute;
  top: 150px;
  left: 150px;
  width: 200px;
  height: 200px;
`

const PopoverLayer = styled(Layer)`
  position: fixed;
  width: 100px;
  height: 100px;
  background: pink;
  border: 1px solid currentColor;
  box-sizing: border-box;
`

export function BasicTest(): React.ReactElement {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const boundaryRect = useRect('viewport')
  const referenceRect = useRect(referenceElement)
  const popoverRect = useRect(popperElement)

  const rects: PopoverRects | null = useMemo(
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

  const popoverStyle: CSSProperties = useMemo(() => {
    if (!rects) return {}

    const {x, y, width} = getPosition('right', ['bottom', 'top', 'left'], rects)

    return {left: x, top: y, width: width}
  }, [rects])

  return (
    <>
      <RefBox display="inline-block" padding={3} ref={setReferenceElement} sizing="border">
        <Text>Reference Box</Text>
      </RefBox>

      <Portal>
        <PopoverLayer ref={setPopperElement} style={popoverStyle}>
          <Box padding={3}>
            <Text>Popover</Text>
          </Box>
        </PopoverLayer>
      </Portal>
    </>
  )
}
