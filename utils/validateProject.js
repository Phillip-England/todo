import validator from 'validator'

import stringMax from '../utils/stringMax'
import stringMin from '../utils/stringMin'
import capFirstLetter from './capFirstLetter'
import { projectNameWhitelist } from './whitelists'

export default function validateProject(name, vision) {

  let error = false
  let message = ''
  let result = {}

  if (name === '') {
    result.error = true
    result.message = 'Project name required'
    return result
  }

  if (vision === '') {
    result.error = true
    result.message = 'Vision required'
    return result
  }

  name = capFirstLetter(name)
  name = validator.trim(name)
  name = validator.escape(name)
  vision = validator.trim(vision)
  vision = validator.escape(vision)
  vision = capFirstLetter(vision)

  if (stringMax(name, 32) === false) {
    result.error = true
    result.message = 'Project name must be 32 characters or less'
    return result
  }

  if (stringMin(name, 3) === false) {
    result.error = true
    result.message = 'Project name must be 3 or more characters'
    return result
  }

  if (validator.isWhitelisted(name, projectNameWhitelist) === false) {
    result.error = true
    result.message = 'Project name cannot contain special characters'
    return result
  }

  if (stringMax(vision, 32) === false) {
    result.error = true
    result.message = 'Vision must be 32 characters or less'
    return result
  }

  if (stringMin(vision, 5) === false) {
    result.error = true
    result.message = 'Vision must be 5 or more characters'
    return result
  }

  if (validator.isWhitelisted(vision, projectNameWhitelist) === false) {
    result.error = true
    result.message = 'Vision cannot contain special characters'
    return result
  }

  return {
    error: false,
    message: ''
  }



}