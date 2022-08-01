export default function capFirstLetter(value) {
  let firstLetter = value[0]
  let allButFirstLetter = value.slice(1)
  return firstLetter.toUpperCase() + allButFirstLetter
}