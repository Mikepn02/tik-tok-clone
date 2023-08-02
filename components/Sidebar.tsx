import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
import { ImCancelCircle } from 'react-icons/im'
import { client } from '../utils/client'


const Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center cursor-pinter font-semibold text-[#F51997] rounded xl:justify-start'
  const userProfile = false
  return (
    <div>
      <div className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        // avoid unnecessary re-renders of the component and negatively impact performance using arrow function apply callbacks
        onClick={() => setShowSideBar((prev) => !prev)}
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl'><AiFillHome /></p>
                <span className='capitalize text-xl hidden xl:block'>For you</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
                   <p className='text-gray-400'>Login to like and comment on videos</p>
                   <div className='pr-4'>
                        <GoogleLogin 
                         clientId=''
                         render={(renderProps) => (
                           <button
                           className='bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 outline-none rounded-md w-full mt-3 hover:text-white hover:bg-[#F51997]'
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}

                           >
                          Login
                           </button>
                         )}
                         onSuccess={() => {}}
                         onFailure={() => {}}
                         cookiePolicy='single_host_origin'

                        
                        />
                   </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
          </div>

      )}
    </div>
  )
}

export default Sidebar
