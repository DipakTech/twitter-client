import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { BiHomeCircle, BiHash, BiMoney, BiUser } from 'react-icons/bi'
import { BsBell, BsEnvelope, BsBookmark, BsTwitter } from 'react-icons/bs'
import { SlOptions } from 'react-icons/sl'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/user'
import { useCallback, useMemo } from 'react'
import { graphqqlClient } from '@/clients/api'
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

interface TwitterLayoutProps {
  children: React.ReactNode
}
interface TwitterSidebarButton {
  title: string
  icon: React.ReactNode
  link: string
}

const TwitterLayout: React.FC<TwitterLayoutProps> = ({ children }) => {
  const { user } = useCurrentUser()
  const queryClient = useQueryClient()

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: 'Home',
        icon: <BiHomeCircle />,
        link: '/',
      },
      {
        title: 'Explore',
        icon: <BiHash />,
        link: '/',
      },
      {
        title: 'Notifications',
        icon: <BsBell />,
        link: '/',
      },
      {
        title: 'Messages',
        icon: <BsEnvelope />,
        link: '/',
      },

      {
        title: 'Profile',
        icon: <BiUser />,
        link: '/profile',
      },
      {
        title: 'More Options',
        icon: <SlOptions />,
        link: '/',
      },
    ],
    []
  )

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

  return (
    <div>
      <main className='grid grid-cols-12 h-screen container  sm:px-56  '>
        <div className=' col-span-2 sm:col-span-3 flex sm:justify-end relative pt-1 mr-5'>
          <div className=''>
            <div className='text-3xl h-fit w-fit hover:bg-gray-600 p-2 rounded-full cursor-pointer transition-all'>
              <BsTwitter />
            </div>
            <div className='text-xl mt-1 pr-5'>
              <ul className='mt-5 flex flex-col space-y-3 items-start   transition-all'>
                {sidebarMenuItems.map((item) => (
                  <li key={item.title} className=''>
                    <Link
                      href={item.link}
                      className='flex space-x-3 font-semibold hover:bg-slate-900 rounded-full px-2 py-2 w-fit cursor-pointer transition-all'
                    >
                      <span className='text-2xl '>{item.icon}</span>
                      <span className='ml-2 hidden sm:inline '>
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className='mt-2 px-2 '>
                <button className='hidden sm:block bg-[#1D9BF0] text-lg rounded-full  w-full py-2'>
                  Post
                </button>
                <button className='block sm:hidden bg-[#1D9BF0] text-lg rounded-full  w-full '>
                  <BsTwitter />
                </button>
              </div>
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
                <h3 className='text-lg hidden sm:block '>
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className='col-span-10 sm:col-span-9   border-x-[0.5px] border border-gray-600 h-screen  overflow-scroll'>
          {children}
        </div>
        <div className='hidden  md:col-span-3'>
          {!user && (
            <div className='px-5 py-2 w-fit bg-slate-700 rounded-lg'>
              <h1 className='text-xl'>New to twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default TwitterLayout
