import validator from 'validator'

import Project from '../../../models/projectModel'
import User from '../../../models/userModel'
import connectMongo from '../../../utils/connectMongo'
import stringMax from '../../../utils/stringMax'
import stringMin from '../../../utils/stringMin'
import capFirstLetter from '../../../utils/capFirstLetter'
import { projectNameWhitelist, textAreaWhitelist } from '../../../utils/whitelists'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {

      //DB CONNECTION
      await connectMongo()
  
      //GETTING DATA
      let data = JSON.parse(req.body)
      let {user, name, vision} = data

      //GETTING THE USER FROM THE REQUEST
      const activeUser = await User.findById(user)
      if (!activeUser) {
        throw 'No user logged in'
      }

      //PROJECT NAME VALIDATION
      if (name === '') throw 'Project Name required'
      name = validator.trim(name)
      name = validator.escape(name)
      name = capFirstLetter(name)
      if (stringMin(name, 5) === false) throw 'Project Name must be 5 or more characters'
      if (stringMax(name, 32) === false) throw 'Project Name must be 32 characters or less'
      if (validator.isWhitelisted(name, projectNameWhitelist) === false) throw 'Project Name contains illegal characters'


      //PROJECT VISION VALIDATION
      if (vision === '') throw 'Vision Statement required'
      vision = validator.trim(vision)
      vision = validator.escape(vision)
      if (stringMin(vision, 5) === false) throw 'Vision Statement must be 5 or more characters'
      if (stringMax(vision, 64) === false) throw 'Vision Statement must be 64 characters or less'
      if (validator.isWhitelisted(vision, textAreaWhitelist) === false) throw 'Vision Statement contains illegal characters'

      //CREATING NEW PROJECT
      const newProject = await Project.create({
        user: activeUser,
        name: name,
        vision: vision
      })

      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        error: false,
        redirect: false,
      })

    } catch (error) {

      //ERROR RESPONSE
      res.status(400).json({
        status: 400,
        error: error,
        redirect: false,
      })
      
    }
  }

}