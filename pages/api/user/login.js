import connectMongo from "../../../utils/connectMongo"
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import bcrypt from 'bcrypt'
import User from '../../../models/userModel'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {

      //DB CONNECTION
      await connectMongo()
  
      //GETTING DATA
      let data = JSON.parse(req.body)
      let {email, password} = data
  
      //EMAIL VALIDATION
      email = email.toLowerCase()
      const user = await User.findOne({email:email})
      if (email === '') throw 'Email required'
      if (user === null) throw 'Invalid email'
  
      //PASSWORD VALIDATION
      if (password === '') throw 'Password required'
      if (user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        setCookie('token', token, {
          req,
          res,
          httpOnly: true,
          maxAge: 60 * 10,
        })
      } else {
        throw 'Invalid credentials'
      }
  
      console.log('logging in...')
  
      //JSON RESPONSE
      res.status(200).json({
        status: 200,
        error: '',
        redirect: '/app/home',
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
