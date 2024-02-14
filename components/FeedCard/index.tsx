import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { BiBookmark, BiMessageRounded } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa'
import { LuBookMarked } from 'react-icons/lu'
import { PiBookBookmark } from 'react-icons/pi'

const FeedCard: React.FC = () => {
  return (
    <div className=' p-5 border  border-gray-600 border-r-0 border-b-0 border-l-0 hover:bg-slate-900 transition-all cursor-pointer'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-1'>
          <Image
            src='https://avatars.githubusercontent.com/u/70911354?s=96&v=4'
            alt='user image'
            height={50}
            width={50}
            className='rounded-full'
          />
        </div>
        <div className='col-span-11'>
          <h5>Dipak Giri</h5>
          <p>
            Freelancing is good. Successfully wrapped up one of my biggest
            projects which has 350+ screens. 🤯🪴 Duration: 24 days Skills: UI
            Design & prototype Software: @figma
          </p>
          <div className='grid grid-cols-4 mt-4 text-lg '>
            <div className='col-span-1'>
              <BiMessageRounded />
            </div>
            <div className='col-span-1'>
              <FaRetweet />
            </div>
            <div className='col-span-1'>
              <AiOutlineHeart />
            </div>
            <div className='col-span-1 flex space-x-3'>
              <BiBookmark />
              <AiOutlineShareAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
