import { NextRequest, NextResponse } from "next/server";
import getUrl from "./utils/getUrl";

export function middleware(req) {

  // if (req.nextUrl.pathname.startsWith('/app')) {
  //   const token = req.cookies.get('token')
  //   if (token) {
  //     return NextResponse.next()
  //   } else {
  //     return NextResponse.redirect(getUrl(''))
  //   }
  // }

}