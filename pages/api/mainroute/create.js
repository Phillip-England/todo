import connectMongo from "../../../utils/connectMongo"
import validator from "validator"
import stringMax from "../../../utils/stringMax"
import stringMin from '../../../utils/stringMin'
import stringRepeat from "../../../utils/stringRepeat"
import { mainRouteWhitelist } from "../../../utils/whitelists"
import MainRoute from '../../../models/mainRouteModel'
import Project from "../../../models/projectModel"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      //DB CONNECTION
      await connectMongo()

      //GETTING DATA
      let data = JSON.parse(req.body)
      let { name, projectId } = data

      //WE ALWAYS WANT A LOWERCASE ROUTE NAME
      name = name.toLowerCase()

      //GETTING THE PROJECT USING THE PROJECTID PASSED IN
      const project = await Project.find({_id:projectId})

      //MAKING SURE WE DO NOT HAVE A DUPLICATE ROUTE
      const routeExists = await MainRoute.find({name: name})
      if (routeExists.length > 0) throw 'Cannot have duplicate main routes'

      //VALIDATE THE ROUTES NAME
      if (name === '') throw 'Main route name required'
      if (stringMax(name, 32) === false) throw 'Main route name must be 32 characters or less'
      if (stringMin(name, 2) === false) throw 'Main route must contain 2 or more characters'
      if (stringRepeat(name, '/', 1) === false) throw 'Main routes can only have one "/" character'
      if (validator.isWhitelisted(name, mainRouteWhitelist) === false) throw 'Main route name contains illegal characters'

      // STORING ROUTE IN DB
      const newMainRoute = await MainRoute.create({
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