import {Box, Card, Code, Container, Heading, Layer, Portal, Stack, Text} from '@sanity/ui'
import React, {CSSProperties, useMemo, useState} from 'react'
import styled from 'styled-components'
import {getPlacementStyle, useRect} from './popover'

const RefBox = styled(Box)`
  background: red;
`

const PopoverLayer = styled(Layer)`
  position: fixed;
`

export function App() {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const referenceRect = useRect(referenceElement)
  const popoverRect = useRect(popperElement)

  const popoverStyle: CSSProperties = useMemo(
    () => getPlacementStyle('bottom', referenceRect, popoverRect),
    [popoverRect, referenceRect]
  )

  return (
    <Container>
      <Stack padding={4} space={4}>
        <Heading as="h1">Popover example</Heading>

        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>

        <div>
          <RefBox display="inline-block" padding={3} ref={setReferenceElement}>
            <Text>reference</Text>
          </RefBox>
        </div>

        <Portal>
          <PopoverLayer ref={setPopperElement} style={popoverStyle}>
            <Card padding={3} radius={2} shadow={2}>
              <Text muted>Popover</Text>
            </Card>
          </PopoverLayer>
        </Portal>

        <Code>{JSON.stringify(referenceRect, null, 2)}</Code>

        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
        <Text as="p" muted>
          Text
        </Text>
      </Stack>
    </Container>
  )
}
