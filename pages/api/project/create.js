import validator from 'validator'

import Project from '../../../models/projectModel'
import User from '../../../models/userModel'
import connectMongo from '../../../utils/connectMongo'
import validateProject from '../../../utils/validateProject'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {

      await connectMongo()

      let data = JSON.parse(req.body)
      let {user, name, vision} = data

      const activeUser = await User.findById(user)
      if (!activeUser) {
        throw 'No user logged in'
      }

      let validation = validateProject(name, vision)
      if (validation.error) throw validation.message


      const newProject = await Project.create({
        user: activeUser._id,
        name: name,
        vision: vision
      })

      const allProjects = await Project.find({user: activeUser._id})

      res.status(200).json({
        data: allProjects
      })

    } catch (error) {

      //ERROR RESPONSE
      res.status(400).json({
        error: error,
      })
      
    }
  }

}