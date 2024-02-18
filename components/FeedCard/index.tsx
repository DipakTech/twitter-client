import { Tweet } from '@/gql/graphql'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { BiBookmark, BiMessageRounded } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa'

interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
  return (
    <div className=' p-5 border  border-gray-600 border-r-0 border-b-0 border-l-0 hover:bg-slate-900 transition-all cursor-pointer'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-1'>
          {data?.author?.profileImageURL && (
            <Image
              src={data?.author?.profileImageURL}
              alt='user iimage'
              height={50}
              width={50}
              className='rounded-full'
            />
          )}
        </div>
        <div className='col-span-11'>
          <h5>
            <Link href={`/${data?.author?.id}`}>
              {data?.author?.firstName} {data?.author?.lastName}
            </Link>
          </h5>
          <p>{data?.content}</p>
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
