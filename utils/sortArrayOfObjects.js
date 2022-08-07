export default function sortArrayOfObjects(array, sortProperty) {

  //STORE PROPS HERE
  let props = []

  //COLLECTING PROPS
  for (let x = 0; x < array.length; x++) {
    props.push(array[x][sortProperty])
  }

  //SORTING
  props = props.sort()

  //STORE RETURN VALUE HERE
  let sortedArray = []

  //COLLECTING OBJECTS IN PROPER ORDER
  for (let x = 0; x < props.length; x++) {
    for (let y = 0; y < array.length; y++) {
      if (array[y][sortProperty] === props[x]) {
        sortedArray.push(array[y])
      }
    }
  }

  return sortedArray

}