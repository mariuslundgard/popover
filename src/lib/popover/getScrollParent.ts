export function getScrollParent(element: HTMLElement): Window | HTMLElement {
  let parent = element.parentElement

  while (parent) {
    if (_isScrollable(parent)) {
      return parent
    }

    parent = parent.parentElement
  }

  return window
}

function _isScrollable(element: HTMLElement) {
  const computedStyle = getComputedStyle(element)
  const overflowX = computedStyle.overflowX
  const overflowY = computedStyle.overflowY
  const isScrollableX = overflowX === 'scroll' || overflowX === 'auto'
  const isScrollableY = overflowY === 'scroll' || overflowY === 'auto'

  return isScrollableX || isScrollableY
}
