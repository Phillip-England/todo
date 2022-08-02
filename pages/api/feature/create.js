import connectMongo from "../../../utils/connectMongo"
import validator from "validator"
import stringMax from "../../../utils/stringMax"
import stringMin from '../../../utils/stringMin'
import { projectNameWhitelist } from "../../../utils/whitelists"
import Feature from '../../../models/featureModel'
import Project from "../../../models/projectModel"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      //DB CONNECTION
      await connectMongo()
  
      //GETTING DATA
      let data = JSON.parse(req.body)
      let { name, projectId } = data


      //GETTING THE PROJECT USING THE PROJECTID PASSED IN
      const project = await Project.find({_id:projectId})

      //VALIDATE THE FEATURES NAME
      if (name === '') throw 'Feature name required'
      name = validator.trim(name)
      name = validator.escape(name)
      if (stringMax(name, 32) === false) throw 'Feature name must be 32 characters or less'
      if (stringMin(name, 4) === false) throw 'Feature name must be 4 characters or more'
      if (validator.isWhitelisted(name, projectNameWhitelist) === false) throw 'Feature name contains illegal characters'

      // STORING FEATURE IN DB
      const newFeature = await Feature.create({
        user: project[0].user,
        project: project[0]._id,
        name: name,
      })

      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        error: false,
        redirect: `/app/project/${projectId}`,
      })

    } catch (error) {

      //ERROR RESPONSE
      res.status(200).json({
        status: 200,
        error: error,
        redirect: false,
      })

    }
  }
}