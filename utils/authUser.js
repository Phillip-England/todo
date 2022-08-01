import cookies from 'next-cookies'
import { setCookie } from 'cookies-next'
import User from '../models/userModel'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import getUrl from './getUrl'

export default async function authUser(context) {

  const tokenSessionAge = 60 * 10
  const refreshSessionAge = 60 * 15

  //GETTING REQ AND RES OBJECTS
  const {req, res} = context

  //GETTING COOKIES
  const allCookies = cookies(context)

  //CHECKING FOR A JWT TOKEN AND REFRESH
  if (allCookies.token === undefined && allCookies.refresh === undefined) {
    console.log('both tokens expired, logging out')
    return false
  }

  //CHECKING THE JWT TOKEN
  if (allCookies.token === undefined && allCookies.refresh) {
    //USE THE REFRESH TOKEN TO CREATE A NEW JWT TOKEN
    console.log('creating new jwt from refresh')
    setCookie('token', allCookies.refresh, {
      req,
      res,
      httpOnly:true,
      maxAge:tokenSessionAge,
    })
  }

  //CHECKING FOR A REFRESH TOKEN
  if (allCookies.token && allCookies.refresh === undefined) {
    //CREATING A REFRESH TOKEN IF WE FAIL TO FIND ONE
    console.log('creating a refresh token from jwt')
    setCookie('refresh', allCookies.token, {
      req,
      res,
      httpOnly:true,
      maxAge:refreshSessionAge,
    })
  }

  //IF WE HAVE BOTH A TOKEN AND A REFRESH TOKEN
  if (allCookies.token && allCookies.refresh) {

    console.log('we have both tokens')

    //DECODING THE JWT AND GETTING OUR USER
    const decoded = jwt.verify(allCookies.token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id).select('-password')

    //RETURNING OUR USER
    return JSON.parse(JSON.stringify(user))

  }




}