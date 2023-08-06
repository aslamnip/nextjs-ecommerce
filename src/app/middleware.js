// export default function middleware(req, res, next) {
//     // Check if the user is logged in
//     const user = req.cookies.get('user');
  
//     if (!user) {
//       // The user is not logged in, so redirect them to the login page
//       res.redirect('/login');
//       return;
//     }
  
//     // The user is logged in, so continue with the request
//     next();
//   }


'use client'
import React from "react"
import { useRouter } from "next/navigation"
// import Cookies from "js-cookie"


  export const IsLogin = (props)=> {
    const router = useRouter()
    router.push('/login')
      
  }