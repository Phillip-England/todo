import connectMongo from "../../../utils/connectMongo"
import validateProject from "../../../utils/validateProject"
import Project from "../../../models/projectModel"
import { trusted } from "mongoose"

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {

      await connectMongo()
      let data = await JSON.parse(req.body)

      let {name, vision, project} = data
      let validation = validateProject(name, vision)
      if (validation.error) throw validation.message
      
      const updatedProject = await Project.findByIdAndUpdate(project._id, {
        name: name,
        vision: vision
      }, {new: true})

      res.status(200).json({
        data: updatedProject,
      })

    } catch (error) {

      res.status(400).json({
        status: 400,
        error: error,
      })
      
    }

  }
}