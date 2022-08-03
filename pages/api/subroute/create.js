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

      //GETTING THE ASSOCIATED PROJECT
      const project = await Project.find({_id: projectId})
      console.log(project)

      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        error: false,
        redirect: false,
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