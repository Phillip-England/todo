export default function addStatefulProp(arrayOfObjects, prop) {
  let result = []
  for (let x = 0; x < arrayOfObjects.length; x++) {
    arrayOfObjects[x][prop] = false
    result.push(arrayOfObjects[x])
  }
  return result
}