import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'

interface IProps {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  const {user ,userLikedVideos ,userVideos } = data
  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-8 h-8'>
          <Image
            src={user.image}
            width={34}
            height={34}
            className='rounded-full'
            alt='user-profile'
            layout='responsive'
          />
        </div>

        <div className='hidden xl:block'>
          <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>{user.userName}
            <GoVerified className='text-blue-400' />
          </p>
          <p className='capitalize text-gray-400 text-xs'>
            {user.userName}
          </p>
        </div>
      </div>

    </div>
  )
}

export const getServerSideProps = async ({
  params: {userId}
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  return {
    props: { data: res.data },
  };
};
export default Profile;    
