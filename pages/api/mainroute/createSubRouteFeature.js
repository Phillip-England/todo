import connectMongo from "../../../utils/connectMongo"
import { basicTextWhitelist } from "../../../utils/whitelists"
import MainRoute from "../../../models/mainRouteModel"
import SubRoute from "../../../models/subRouteModel"
import validateData from '../../../utils/validateData'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      await connectMongo()

      let data = JSON.parse(req.body)
      let {name, description, mainRouteId, subRouteId} = data

      const validatedName = validateData(name, 'Name', {
        max: 32,
        min: 1,
        required: true,
        capFirst: true,
        trim: true,
        escape: true,
        whitelist: basicTextWhitelist,
      })

      if (validatedName.error) throw validatedName.message

      const validatedDescription = validateData(description, 'Description', {
        max: 64,
        min: 1,
        required: true,
        capFirst: true,
        trim: true,
        escape: true,
        whitelist: basicTextWhitelist,
      })

      if (validatedDescription.error) throw validatedDescription.message

      const mainRoute = await MainRoute.findOne({_id: mainRouteId})

      for (let x = 0; x <  mainRoute.subRoutes.length; x++) {
        if (mainRoute.subRoutes[x]._id == subRouteId) {
          mainRoute.subRoutes[x].features.push({
            name: validatedName.data,
            description: validatedDescription.data,
            subRoute: subRouteId,
          })
        }
      }

      mainRoute.save()

      // const dele = await MainRoute.deleteMany({})

      res.status(200).json({
        status: 200,
        data: mainRoute,
      })

    } catch (error) {

      console.log(error)

      res.status(400).json({
        status: 400,
        error: error,
        redirect: false,
      })

    }
  }
}