import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { useRouter } from 'next/router';

import Link from 'next/link';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
 const {allUsers} = useAuthStore()
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm } : any = router.query;
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideo = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const seachedAccounts =  allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))


  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full '>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideo}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {seachedAccounts.length > 0 ? (
               seachedAccounts.map((user:IUser,idx:number) => (
                <Link href={`/profile/${user._id }`} key={idx}>

                <div className='flex p-2 cursor-pointer rounded font-semibold border-b-2 border-gray-200 gap-3' >
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className='rounded-full'
                      alt='user-profile'
                    />
                  </div>

                  <div className='hidden xl:block'>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>{user.userName.replaceAll(' ', '')}
                      <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
               ))
          ): (
            <NoResults text={`No video result for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
        {videos.length ? (
          videos.map((post: Video, idx: number) => (
            <VideoCard post={post} key={idx} />
          ))
        ) : (
          <NoResults text={`No Video Results for ${searchTerm}`} />
        )}
      </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
    const videos = res.data; // Assuming the data structure matches Video[]
    return {
      props: { videos },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { videos: [] },
    };
  }
};

export default Search;
