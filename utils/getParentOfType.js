const getParentOfType = (element, type, index) => {
  if (element.parentElement.nodeName === type) {
    return element.parentElement
  } else {
    index++
    if (index === 5) {
      return false
    } else {
      getParentOfType(element.parentElement, type, index)
    }
  }
}

export default getParentOfType