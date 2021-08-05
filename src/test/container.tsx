import {Box, Card, Layer, Portal, Text} from '@sanity/ui'
import React, {CSSProperties, useMemo, useState} from 'react'
import styled from 'styled-components'
import {getPopoverPosition, usePopoverRects} from '../lib/popover'

const Root = styled(Card)`
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
`

const RefBox = styled(Box)`
  background: lightgreen;
  border: 1px solid currentColor;
  position: absolute;
  top: calc(100vh + 200px);
  left: calc(100vw + 200px);
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
  /* transition: transform 100ms; */
`

export function ContainerTest(): React.ReactElement {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)

  const rects = usePopoverRects({
    boundary: boundaryElement,
    popover: popoverElement,
    reference: referenceElement,
  })

  const popoverStyle: CSSProperties = useMemo(() => {
    if (!rects) return {}

    const {x, y} = getPopoverPosition(
      {
        distance: 4,
        fallbackPlacements: ['left', 'top', 'bottom'],
        placement: 'right',
      },
      rects
    )

    return {
      inset: '0 auto auto 0',
      transform: `translate3d(${x}px, ${y}px, 0)`,
    }
  }, [rects])

  return (
    <Root overflow="auto" ref={setBoundaryElement} shadow={2}>
      <div style={{width: 'calc(200vw + 400px)', height: 'calc(200vh + 400px)'}}>
        <RefBox padding={3} ref={setReferenceElement} sizing="border">
          <Text>Reference Box</Text>
        </RefBox>

        <Portal>
          <PopoverLayer ref={setPopoverElement} style={popoverStyle}>
            <Box padding={3}>
              <Text>Popover</Text>
            </Box>
          </PopoverLayer>
        </Portal>
      </div>
    </Root>
  )
}
