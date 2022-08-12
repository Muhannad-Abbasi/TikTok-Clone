import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import LikeButton from '../components/LikeButton';
import { BASE_URL } from '../utils';
import axios from 'axios';
import CommentsButton from './CommentsButton';

interface Iprops {
  post: Video;
}

const VideoCard: NextPage<Iprops> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [likedPost, setLikedPost] = useState(post);
  const { userProfile }: any = useAuthStore();

  const handleLike =async (like: boolean) => {
    if(userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: likedPost._id,
        like
      })

      setLikedPost({ ...likedPost, likes: data.likes })
    }
  }

  const onVideoPress = () => {
    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if(videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <Image 
                width={62}
                height={62}
                className='rounded-full'
                src={post.postedBy.image}
                alt='profile photo'
                layout='responsive'
              />
            </Link>
          </div>
          <div className='flex flex-col justify-center'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary lowercase'>
                    {post.postedBy.userName}
                    {``}
                    <GoVerified
                      className='text-blue-400 text-md'
                    />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 md:block'>
                    {post.postedBy.userName}
                  </p>
                </div>
                <div>
                  <p>{post.caption}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className='md:ml-20 flex gap-4 relative w-fit sm:ml-14'
      >
        <div className='rounded-3xl'>
          <Link href={`/detail/${post._id}`}>
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
            >

            </video>
          </Link>
          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-[3.5rem] md:left-14 lg:left-0 flex gap-10 lg:ml-[15rem] w-[100px] md:w-[50px] lg:w-[400px]'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className='px-1 hidden md:block self-center'>
          {userProfile && (
            <>
              <LikeButton
                flex='flex'
                likes={likedPost?.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
              <Link
                href={`/detail/${post._id}`}
              >
                <a>
                  <CommentsButton
                    flex='flex'
                    comments={post.comments}
                  />
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard;