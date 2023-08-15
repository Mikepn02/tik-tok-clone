import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

import { AiOutlineHeart } from 'react-icons/ai'
import { BiCommentAdd } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs'
import { BsUpload } from 'react-icons/bs'

import LikeButton from './LikeButton';

import { Video } from './../types';
import VideoIcon from './VideoIcon';

interface IProps {
  post: Video,
  isShowingOnHome?: boolean
}

const VideoCard: NextPage<IProps> = ({ post: { caption, postedBy, video, _id, likes }, isShowingOnHome }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setIsPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef.current?.play();
      setIsPlaying(true)
    }
  }
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  if (!isShowingOnHome) {
    return (
      <div>
        <Link href={`/detail/${_id}`}>
          <video
            loop
            src={video.asset.url}
            className='w-[250px] md:w-full rounded-xl cursor-pointer'
          ></video>
        </Link>
        <div className='flex gap-2 -mt-8 items-center ml-4'>
          <p className='text-white text-lg font-medium flex gap-1 items-center'>
            <BsPlay className='text-2xl' />
            {likes?.length || 0}
          </p>
        </div>
        <Link href={`/detail/${_id}`}>
          <p className='mt-5 text-md text-gray-800 cursor-pointer w-210'>
            {caption}
          </p>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex  border-b-2 border-gray-200 pb-6">
      <div>
        <div className='flex -gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`profile/${postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={postedBy?.image}
                  alt='profile photo'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`profile/${postedBy._id}`}>
              <div className='flex gap-2 items-center'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {postedBy?.userName}
                  <GoVerified
                    className='text-blue-400 text-md'
                  />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{postedBy?.userName}</p>

              </div>
            </Link>
          </div>
        </div>
        <div className='lg:ml-20 flex gap-4 relative'>
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className='rounded-3xl w-[500px]'>
            <Link href={`/detail/${_id}`}>
              <video
                loop
                ref={videoRef}
                className='lg:w-[600px]   md:h-[400px] lg:h-[530px]  rounded-2xl cursor-pointer border-gray-100'
                src={video?.asset.url}

              >

              </video>
            </Link>
            {isHover && (
              <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-center w-[100px] md:w-[50px] p-3'>
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className='text-block text-2xl lg:text-4xl' />
                  </button>
                ) : (
                  <button>
                    <BsFillPlayFill onClick={onVideoPress} />
                  </button>
                )}
                {isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiVolumeOff className='text-block text-2xl lg:text-4xl' />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiVolumeUp />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[200px]  h-[200px] pt-40 pl-20">



        <VideoIcon Icon={AiOutlineHeart} />
        <VideoIcon Icon={BiCommentAdd} />
        <VideoIcon Icon={BsBell} />
        <VideoIcon Icon={BsUpload} />



      </div>
    </div>
  )
}

export default VideoCard
