import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs'

import React, { useCallback, useState } from 'react'
import {
  BiHash,
  BiHomeCircle,
  BiImageAlt,
  BiMoney,
  BiUser,
} from 'react-icons/bi'

import FeedCard from '@/components/FeedCard'
import { SlOptions } from 'react-icons/sl'

import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import { graphqqlClient } from '@/clients/api'
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user'
import { useCurrentUser } from '@/hooks/user'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet'
import { Tweet } from '@/gql/graphql'

interface TwitterSidebarButton {
  title: string
  icon: React.ReactNode
}

const SidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <BiHomeCircle />,
  },
  {
    title: 'Explore',
    icon: <BiHash />,
  },
  {
    title: 'Notifications',
    icon: <BsBell />,
  },
  {
    title: 'Messages',
    icon: <BsEnvelope />,
  },
  {
    title: 'Bookmarks',
    icon: <BsBookmark />,
  },
  {
    title: 'Twitter Blue',
    icon: <BiMoney />,
  },
  {
    title: 'Profile',
    icon: <BiUser />,
  },
  {
    title: 'More Options',
    icon: <SlOptions />,
  },
]

const Home: React.FC = () => {
  const { user } = useCurrentUser()
  const { tweets } = useGetAllTweets()
  const { mutate } = useCreateTweet()

  const queryClient = useQueryClient()

  const [content, setContent] = useState('')

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential
      if (!googleToken) return toast.error('Google token not found')

      const { verifyGoogleToken } = await graphqqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      )

      toast.success('Verified successfully')

      if (verifyGoogleToken)
        window.localStorage.setItem('__twitter_token', verifyGoogleToken)
      await queryClient.invalidateQueries(['current-user'])
    },
    [queryClient]
  )

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
    <main className='grid grid-cols-12 h-screen container  mx-auto px-24  pt-2 '>
      <div className=' col-span-3 ml-10 relative'>
        <div className='text-3xl h-fit w-fit hover:bg-gray-600 p-2 rounded-full cursor-pointer transition-all'>
          <BsTwitter />
        </div>
        <div className='text-xl'>
          <ul className='mt-5 flex flex-col space-y-3 items-start   transition-all'>
            {SidebarMenuItems.map((item) => (
              <li
                key={item.title}
                className='flex space-x-4 font-semibold hover:bg-slate-900 rounded-full px-2 py-2 w-fit cursor-pointer transition-all'
              >
                <div className='text-2xl '>{item.icon}</div>
                <div className='ml-2 '>{item.title}</div>
              </li>
            ))}
          </ul>
          <div className='mt-2 px-2 py-2'>
            <button className='bg-[#1D9BF0] text-lg rounded-full  w-full py-3'>
              Post
            </button>
          </div>
        </div>
        <div className='mt-4 absolute bottom-5'>
          {user && user.profileImageURL && (
            <div className='flex space-x-2 items-center bg-transparent px-4 py-2 rounded-full w-full'>
              <Image
                height={40}
                width={40}
                className='rounded-full'
                src={user.profileImageURL}
                alt={user.firstName}
              />
              <h4 className='text-xl'>{user.firstName}</h4>
              <h4 className='text-xl'>{user.lastName}</h4>
            </div>
          )}
        </div>
      </div>
      <div className=' col-span-5 border-x-[0.5px] border border-gray-600 h-screen  overflow-scroll'>
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
      </div>
      <div className=' col-span-3'>
        {!user && (
          <div className='px-5 py-2 w-fit bg-slate-700 rounded-lg'>
            <h1 className='text-xl'>New to twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        )}
      </div>
    </main>
  )
}
export default Home
