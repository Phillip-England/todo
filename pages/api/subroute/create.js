import connectMongo from "../../../utils/connectMongo"
import validator from "validator"
import stringMax from "../../../utils/stringMax"
import stringMin from '../../../utils/stringMin'
import stringRepeat from "../../../utils/stringRepeat"
import { mainRouteWhitelist } from "../../../utils/whitelists"
import SubRoute from '../../../models/subRouteModel'
import Project from "../../../models/projectModel"
import MainRoute from "../../../models/mainRouteModel"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      //DB CONNECTION
      await connectMongo()

      //GETTING DATA
      let data = JSON.parse(req.body)
      let { name, projectId, mainRouteId } = data

      //GETTING THE ASSOCIATED PROJECT
      const project = await Project.find({_id: projectId})

      //GETTING THE ASSOCIATED MAINROUTE
      const mainRoute = await MainRoute.find({_id: mainRouteId})

      //ALL ROUTES ARE IN LOWERCASE
      name = name.toLowerCase()

      //ALL ROUTES MUST END IN '/'
      if (name[name.length-1] !== '/') {
        name = name + '/'
      }

      //MAKING SURE WE DO NOT HAVE A DUPLICATE
      const routeExists = await SubRoute.find({name: name}, {mainRoute: mainRouteId})
      if (routeExists.length > 0) throw 'Subroutes cannot be duplicated'

      //SUB ROUTE VALIDATION
      if (stringMin(name, (mainRoute[0].name.length + 2)) === false) throw `Format: ${mainRoute[0].name}/<subroute>`
      if (stringMax(name, 64) === false) throw 'Okay, calm down now.'
      if (validator.isWhitelisted(name, mainRouteWhitelist) === false) throw 'Subroute contains illegal characters' 

      //STORING SUBROUTE IN DB
      const newRoute = await SubRoute.create({
        user: project[0].user,
        project: project[0]._id,
        mainRoute: mainRoute[0]._id,
        name: name,
      })

      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        error: false,
        redirect: `/app/project/${projectId}`,
        data: newRoute
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