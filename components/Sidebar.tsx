import React, { useState , useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { AiFillHome ,AiOutlineMenu } from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'


const Sidebar = () => {
  return (
    <div className='xl:hidden m-2 ml-4 mt-3'>
      sidebar

    </div>
  )
}

export default Sidebar
