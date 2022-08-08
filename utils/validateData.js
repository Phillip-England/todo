import validator from "validator"
import capFirstLetter from './capFirstLetter'

export default function validateData(data, name, options) {

  name = name || 'Data'
  options = options || {}

  let result = {}
  
  let required = options.required || false
  let max = options.max || false
  let min = options.min || false
  let whitelist = options.whitelist || false
  let trim = options.trim || false
  let escape = options.escape || false
  let capFirst = options.capFirst || false

  if (required) {
    if (data === '') {
      result.error = true
      result.message = `${name} is required`
      return result
    }
  }

  if (trim) {
    data = validator.trim(data)
  }

  if (escape) {
    data = validator.escape(data)
  }

  if (capFirstLetter) {
    data = capFirstLetter(data)
  }

  if (whitelist) {
    if (validator.isWhitelisted(data, whitelist) === false) {
      result.error = true
      result.message = `${name} contains illegal characters`
      return result
    }
  }

  if (max) {
    if (data.length > max) {
      result.error = true
      result.message = `${name} cannot contain more than ${max} characters`
      return result
    }
  }

  if (min) {
    if (data.length < min) {
      result.error = true
      result.message = `${name} must contain ${min} or more characters`
      return result
    }
  }

  result.error = false
  result.message = ''
  result.data = data
  return result

}