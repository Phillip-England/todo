import connectMongo from "../../../utils/connectMongo"
import { redditNameWhitelist } from "../../../utils/whitelists"
import validateData from '../../../utils/validateData'
import MainRoute from '../../../models/mainRouteModel'
import Project from "../../../models/projectModel"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      await connectMongo()
      let data = JSON.parse(req.body)
      let { name, projectId } = data

      // const del = await MainRoute.deleteMany({})

      const project = await Project.find({_id:projectId})
      const routeExists = await MainRoute.find({name: name, project: projectId})
      if (routeExists.length > 0) throw 'Cannot have duplicate main routes'

      let nameValidation = validateData(name, 'Name', {
        required: true,
        max: 32,
        min: 1,
        whitelist: redditNameWhitelist,
        trim: true,
        escape: true,
        capFirst: true
      })

      if (nameValidation.error) throw nameValidation.message

      const newMainRoute = await MainRoute.create({
        user: project[0].user,
        project: project[0]._id,
        name: nameValidation.data,
      })

      const mainRoutes = await MainRoute.find({project: project[0]._id}).sort({name:'ascending'})

      res.status(200).json({
        status: 200,
        data: mainRoutes,
      })

    } catch (error) {

      res.status(200).json({
        status: 200,
        error: error,
        redirect: false,
      })

    }
  }
}