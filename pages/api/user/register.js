import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import stringHasUpper from "../../../utils/stringHasUpper"
import stringMax from "../../../utils/stringMax"
import stringMin from "../../../utils/stringMin"
import { passwordWhitelist, usernameWhitelist } from "../../../utils/whitelists"
import connectMongo from "../../../utils/connectMongo"
import User from '../../../models/userModel'

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
    
      //DB CONNECTION
      await connectMongo()

      //GETTING DATA
      let data = JSON.parse(req.body)
      let {email, username, password} = data
  
      //EMAIL VALIDATION
      if (email === '') throw 'Email required'
      email = email.toLowerCase()
      const emailExists = await User.findOne({email:email})
      if (emailExists) throw 'Email taken'
      email = validator.trim(email)
      email = validator.escape(email)
      if (validator.isEmail(email) === false) throw 'Valid email needed'
  
      //USERNAME VALIDATION
      if (username === '') throw 'Username requried'
      const usernameExists = await User.findOne({username:username})
      if (usernameExists) throw 'Username taken'
      username = validator.escape(username)
      username = validator.trim(username)
      if (stringMax(username, 32) === false) throw 'Username must be 32 characters or less'
      if (stringMin(username, 5) === false) throw 'Username must be 8 characters or more'
      if (validator.isWhitelisted(username, usernameWhitelist) === false ) throw 'Username contains illegal characters'
  
      //PASSWORD VALIDATION
      if (password === '') throw 'Password required'
      password = validator.escape(password)
      if (stringHasUpper(password) === false) throw 'Password must contain at least 1 uppercase letter'
      if (stringMax(password, 32) === false) throw 'Password must be 32 characters or less'
      if (stringMin(password, 8) === false) throw 'Password must be 8 characters or more'
      if (validator.isWhitelisted(password, passwordWhitelist) === false ) throw 'Password contains illegal characters'
  
      //HASHING PASSWORD
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
  
      //CREATING NEW USER
      const newUser = await User.create({
        email,
        username,
        password:hashedPassword,
      })

      //JSON RESPONSE
      res.status(200).json({message: ''})
      
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

}
