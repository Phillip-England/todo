import validator from 'validator'
import Project from '../../../models/projectModel'
import connectMongo from '../../../utils/connectMongo'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
      await connectMongo()
      let data = JSON.parse(req.body)
      const updatedProject = await Project.updateOne({_id: data.project}, { '$pull': { 'notes': { _id: data._id } } })
      res.status(200).json({
        success: true
      })

    } catch (error) {

      //ERROR RESPONSE
      console.log(error)
      res.status(400).json({
        error: error,
      })
      
    }
  }

}