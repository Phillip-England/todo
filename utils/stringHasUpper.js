export default function stringHasUpper(string) {
  const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  for (let x = 0; x < string.length; x++) {
    for (let y = 0; y < upperCaseLetters.length; y++){
      if (string[x] === upperCaseLetters[y]) {
        return true
      }
    }
  }
  return false
}