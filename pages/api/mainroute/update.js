import MainRoute from '../../../models/mainRouteModel'
import validateData from '../../../utils/validateData'
import { redditNameWhitelist } from '../../../utils/whitelists'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try { 

      const data = JSON.parse(req.body)
      const { name, mainRouteId } = data

      let validatedName = validateData(name, "Name", {
        max: 32,
        min: 1,
        whitelist: redditNameWhitelist,
        capFirst: true,
        trim: true,
        escape: true,
      })

      if (validatedName.error) throw validatedName.message

      const updatedMainRoute = await MainRoute.findByIdAndUpdate(mainRouteId, {
        name: validatedName.data
      }, {new: true})

      res.status(200).json({
        data: updatedMainRoute,
      })
      
    } catch (error) {
      console.log(error)
      res.status(400).json({
        error: error,
      })

    }
  }

}