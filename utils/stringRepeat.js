export default function stringRepeat(string, character, number) {
  let arr = []
  for (let x = 0; x < string.length; x++) {
    if (string[x] === character) {
      arr.push(string[x])
    }
  }
  if (arr.length > number) {
    return false
  } else {
    return true
  }
}