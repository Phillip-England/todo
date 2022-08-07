import connectMongo from "../../../utils/connectMongo"
import validator from "validator"
import stringMax from "../../../utils/stringMax"
import stringMin from '../../../utils/stringMin'
import { mainRouteWhitelist } from "../../../utils/whitelists"
import MainRoute from "../../../models/mainRouteModel"
import serverError from "../../../utils/serverError"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      await connectMongo()

      let data = JSON.parse(req.body)
      let { name, mainRouteId } = data
      name = name.toLowerCase()

      const mainRoute = await MainRoute.findById(mainRouteId)
      for (let x = 0; x < mainRoute.subRoutes.length; x++) {
        if (mainRoute.subRoutes[x].name === name) throw 'Cannot have duplicate routes'
      }

      if (stringMin(name, (mainRoute.name.length + 2)) === false) throw `Format: ${mainRoute.name}/<subroute>`
      if (stringMax(name, 64) === false) throw 'Okay, calm down now.'
      if (validator.isWhitelisted(name, mainRouteWhitelist) === false) throw 'Subroute contains illegal characters' 

      const updatedMainRoute = await MainRoute.findByIdAndUpdate(mainRouteId, { $push: { 'subRoutes': { "name": name, 'mainRoute': mainRouteId } } })
      const allMainRoutes = await MainRoute.find({project: updatedMainRoute.project})

      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        data: allMainRoutes
      })

    } catch (error) {

      serverError(error)

      res.status(400).json({
        status: 400,
        error: error,
        redirect: false,
      })

    }
  }
}