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
  const { searchTerm } : any= router.query;
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideo = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const seachedAccounts =  allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  console.log(videos);

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
        <div className='md:mt-16'>Accounts</div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No video result for ${searchTerm}`} />
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
