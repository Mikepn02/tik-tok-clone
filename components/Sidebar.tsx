import React, { useState , useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { AiFillHome ,AiOutlineMenu } from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'


const Sidebar = () => {
  const [showSideBar,setShowSideBar] = useState(true);
  const normalLink =  'flex items-center gap-3 hover:bg-primary p-3 justify-center cursor-pinter font-semibold text-[#F51997] rounded xl:justify-start'
  const userProfile = false
  return (
    <div className='block  m-2 ml-4 mt-3 text-xl'
    // avoid unnecessary re-renders of the component and negatively impact performance using arrow function apply callbacks
    onClick={() => setShowSideBar((prev) =>  !prev)}
    >
      {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
           <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
              <Link href='/'>
                <div className={normalLink}>
                  <p className='text-2xl'><AiFillHome /></p>
                  <span className='hidden text-xl xl:block text-neutral-900'>For you</span>
                </div>
              </Link>
           </div>
      </div>
      {!userProfile && (  
        <div className='hidden px-2 py-4  xl:block'>
          <p className='text-gray-200'>Log in to line and comment on videos</p>
          <div className='pr-4'>
            <GoogleLogin 
             clientId=''
             onSuccess={() => {}}
             onFailure={() => {}}
             cookiePolicy='single_host_origin '
            
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
