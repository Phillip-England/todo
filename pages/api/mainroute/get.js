import MainRoute from '../../../models/mainRouteModel'

export default async function handler(req, res) {

  //WILL REQUIRED PROJECT ID TO GET ASSOCIATED ROUTES
  if (req.method === 'POST') {
    try {

      //INIT RETURN VALUES
      const returnData = {}

      //GETTING DATA FROM REQUEST
      let projectId = JSON.parse(req.body)

      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        error: false,
        redirect: false,
        data: returnData
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