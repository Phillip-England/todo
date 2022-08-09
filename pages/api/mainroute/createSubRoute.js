import connectMongo from "../../../utils/connectMongo"
import { redditNameWhitelist } from "../../../utils/whitelists"
import MainRoute from "../../../models/mainRouteModel"
import validateData from '../../../utils/validateData'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      await connectMongo()

      let data = JSON.parse(req.body)
      let { name, mainRouteId } = data

      let validatedName = validateData(name, "Name", {
        max: 32,
        min: 1,
        whitelist: redditNameWhitelist,
        capFirst: true,
        trim: true,
        escape: true,
      })

      if (validatedName.error) throw validatedName.message

      const mainRoute = await MainRoute.findById(mainRouteId)

      for (let x = 0; x < mainRoute.subRoutes.length; x++) {
        if (mainRoute.subRoutes[x].name === validatedName.data) throw 'Cannot have duplicate routes'
      }

      const updatedMainRoute = await MainRoute.findByIdAndUpdate(mainRouteId, { $push: { 'subRoutes': { "name": validatedName.data, 'mainRoute': mainRouteId } } }, {new: true})

      // const dele = await MainRoute.deleteMany({})

      res.status(200).json({
        status: 200,
        data: updatedMainRoute,
      })

    } catch (error) {

      res.status(400).json({
        status: 400,
        error: error,
        redirect: false,
      })

    }
  }
}