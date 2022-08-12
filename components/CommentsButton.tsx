import React, { useState } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';

interface IProps {
  comments: any[];
  flex: string;
}

const CommentsButton = ({ comments }: IProps) => {
  const commentsCount = comments;
  
  return (
    <div className={`flex gap-6`}>
      <div className='mt-4 flex flex-col justify-center items-center'>
        <div className='bg-primary rounded-full p-2 md:p-4'>
          <BsFillChatDotsFill className='text-lg md:text-2xl' />
        </div>
        <p className='text-md font-semibold '>{commentsCount?.length || 0}</p>
      </div>
    </div>
  )
}

export default CommentsButton;