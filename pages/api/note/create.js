import connectMongo from "../../../utils/connectMongo"
import Feature from '../../../models/featureModel'
import stringMax from '../../../utils/stringMax'
import stringMin from '../../../utils/stringMin'
import validator from "validator"
import { textAreaWhitelist } from '../../../utils/whitelists'

export default async function handler(req, res) {
  if (req.method === 'POST'){
    try {

      //DB CONNECTION
      await connectMongo()

      //GETTING DATA
      let data = JSON.parse(req.body)
      let { details, featureId } = data

      //GETTING THE FEATURE ASSOCIATED WITH THE NOTE
      const feature = await Feature.find({_id:featureId})


      //VALIDATING THE NOTE DATA
      if (details === '') throw 'Note required'
      details = validator.trim(details)
      details = validator.escape(details)
      if (stringMax(details, 48) === false) throw 'Note must be 48 characters or less'
      if (stringMin(details, 4) === false) throw 'Note must be 4 or more characters'
      if (validator.isWhitelisted(details, textAreaWhitelist))

      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        error: false,
        redirect: false,
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