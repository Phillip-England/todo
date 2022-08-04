
export default async function handler(req, res) {
  try {
    
    //JSON RESPONSE
    res.status(200).json({
      status: 200,
      error: false,
      redirect: false,
    })

  } catch (error) {

    //ERROR RESPOSNE
    res.status(400).json({
      status: 400,
      error: error,
      redirect: false,
    })

  }
}