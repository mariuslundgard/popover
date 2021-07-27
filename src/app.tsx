import React, {CSSProperties, useMemo, useState} from 'react'
import {getPlacementStyle, useRect} from './popover'

export function App() {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const referenceRect = useRect(element)
  const popoverRect = useRect(popperElement)

  const referenceStyle: CSSProperties = useMemo(
    () => ({
      background: 'red',
      display: 'inline-block',
    }),
    []
  )

  const popoverStyle: CSSProperties = useMemo(
    () => ({
      background: '#ccc',
      position: 'fixed',
      ...getPlacementStyle('bottom', referenceRect, popoverRect),
    }),
    [popoverRect, referenceRect]
  )

  return (
    <div>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>

      <div ref={setElement} style={referenceStyle}>
        reference
      </div>

      <div ref={setPopperElement} style={popoverStyle}>
        popper
      </div>

      <pre>{JSON.stringify(referenceRect, null, 2)}</pre>

      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
    </div>
  )
}
