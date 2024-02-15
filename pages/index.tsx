import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs'

import React, { useCallback } from 'react'
import { BiHash, BiHomeCircle, BiMoney, BiUser } from 'react-icons/bi'

import FeedCard from '@/components/FeedCard'
import { SlOptions } from 'react-icons/sl'

import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import { graphqqlClient } from '@/clients/api'
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user'

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
        window.localStorage.setItem('__twitter_token', googleToken)
    },
    []
  )

  return (
    <main className='grid grid-cols-12 h-screen container  mx-auto px-24  pt-2 '>
      <div className=' col-span-3 ml-10'>
        <div className='text-3xl h-fit w-fit hover:bg-gray-600 p-2 rounded-full cursor-pointer transition-all'>
          <BsTwitter />
        </div>
        <div className='text-xl'>
          <ul className='mt-5 flex flex-col space-y-3 items-start   transition-all'>
            {SidebarMenuItems.map((item) => (
              <li
                key={item.title}
                className='flex space-x-2 font-semibold hover:bg-slate-900 rounded-full px-2 py-2 w-fit cursor-pointer transition-all'
              >
                <div className='text-2xl '>{item.icon}</div>
                <div className='ml-2 '>{item.title}</div>
              </li>
            ))}
          </ul>
          <div className='mt-5 px-2 py-2'>
            <button className='bg-[#1D9BF0] text-lg rounded-full  w-full py-3'>
              Post
            </button>
          </div>
        </div>
      </div>
      <div className=' col-span-5 border-x-[0.5px] border border-gray-600 h-screen  overflow-scroll'>
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      <div className=' col-span-3'>
        <div className='px-5 py-2 w-fit bg-slate-700 rounded-lg'>
          <h1 className='text-xl'>New to twitter?</h1>
          <GoogleLogin onSuccess={handleLoginWithGoogle} />
        </div>
      </div>
    </main>
  )
}
export default Home
