import cookies from 'next-cookies'
import { deleteCookie } from 'cookies-next'

export default function logoutUser(context) {

  //GETTING REQ AND RES FROM CONTEXT
  const {req, res} = context

  //GETTING ALL COOKIES
  const allCookies = cookies(context)

  //DELETING OUR TOKEN AND REFRESH TOKEN
  deleteCookie('token', {req, res})
  deleteCookie('refresh', {req, res})

}