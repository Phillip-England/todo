import connectMongo from "../../../utils/connectMongo"
import Project from '../../../models/projectModel'

import validateData from "../../../utils/validateData"
import { basicTextWhitelist } from "../../../utils/whitelists"

export default async function handler (req, res){

  if (req.method === 'POST') {
    try {

      await connectMongo()
      // const deleteAllProjects = await Project.deleteMany({})
      let data = JSON.parse(req.body)
      let { note, project } = data

      let validDetails = validateData(note, 'Note', {
        min: 1,
        max: 64,
        trim: true,
        escape: true,
        whitelist: basicTextWhitelist,
      })

      if (validDetails.error) throw validDetails.message

      if (project.notes.length > 10) {
        throw 'Only 10 notes per project allowed'
      }

      const updatedProject = await Project.findOneAndUpdate({_id: project._id}, { $push: {'notes': { 'note': note, 'project': project._id } } }, {new: true} )

      res.status(200).json({
        data: updatedProject
      })

    } catch (error) {
      console.log(error)
      res.status(400).json({
        error: error
      })
    }
  }

}