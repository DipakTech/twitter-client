import React, { useCallback, useState } from 'react'
import { BiImageAlt } from 'react-icons/bi'

import FeedCard from '@/components/FeedCard'

import Image from 'next/image'
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet'
import { Tweet } from '@/gql/graphql'
import TwitterLayout from '@/components/FeedCard/layout/TwitterLayout'
import { useCurrentUser } from '@/hooks/user'
import { GetServerSideProps } from 'next'
import { graphqqlClient } from '@/clients/api'
import { getAllTweetQuery } from '@/graphql/query/Tweet'

interface HomeProps {
  tweets: Tweet[]
}

const Home: React.FC<HomeProps> = ({ tweets }) => {
  const [content, setContent] = useState('')
  const { mutate } = useCreateTweet()
  const { user } = useCurrentUser()

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
  }, [])

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    })
    setContent('')
  }, [mutate, content])

  return (
    <div>
      <TwitterLayout>
        <div>
          <div className='p-5 border  border-gray-600 border-r-0 border-b-0 border-l-0 hover:bg-slate-900 transition-all cursor-pointer'>
            <div className='grid grid-cols-12 gap-3'>
              <div className='col-span-1'>
                {user && user.profileImageURL && (
                  <Image
                    src={user.profileImageURL}
                    alt='user image'
                    height={50}
                    width={50}
                    className='rounded-full'
                  />
                )}
              </div>
              <div className='col-span-11'>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className='w-full h-15 bg-transparent border-none outline-none'
                  placeholder='What is happening?'
                ></textarea>
                <div className='flex justify-between items-center mt-4 text-lg '>
                  <div className='col-span-1 mt-2'>
                    <BiImageAlt
                      className='text-xl'
                      onClick={handleSelectImage}
                    />
                  </div>
                  <button
                    onClick={handleCreateTweet}
                    className='bg-[#1D9BF0] text-sm rounded-full px-5 py-2'
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) => (
          <FeedCard key={tweet?.id} data={tweet as Tweet} />
        ))}
      </TwitterLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const allTweets = await graphqqlClient.request(getAllTweetQuery)

  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    },
  }
}
export default Home
