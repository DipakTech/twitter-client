import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs'

import React from 'react'
import { BiHash, BiHomeCircle, BiUser } from 'react-icons/bi'

import { Inter } from 'next/font/google'

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
    title: 'Profile',
    icon: <BiUser />,
  },
]

export default function Home() {
  return (
    <main>
      <div className='grid grid-cols-12 h-screen container mx-auto px-6 pt-2'>
        <div className=' col-span-3 '>
          <div className='text-4xl h-fit w-fit hover:bg-gray-600 mx-2 p-2 rounded-full cursor-pointer transition-all'>
            <BsTwitter />
          </div>
          <div className='px-4'>
            <ul className='mt-5 flex flex-col space-y-3 items-start   transition-all'>
              {SidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className='flex space-x-2 font-semibold hover:bg-slate-600 rounded-full px-2 py-2 w-fit cursor-pointer transition-all'
                >
                  <div className='text-2xl '>{item.icon}</div>
                  <div className='ml-2 '>{item.title}</div>
                </li>
              ))}
            </ul>
            <div className='mt-5 px-4 py-3'>
              <button className='bg-[#1D9BF0] text-lg rounded-full  w-full py-3'>
                Post
              </button>
            </div>
          </div>
        </div>
        <div className=' col-span-6 border-x-[0.5px] border-gray-200'></div>
        <div className=' col-span-3'></div>
      </div>
    </main>
  )
}
