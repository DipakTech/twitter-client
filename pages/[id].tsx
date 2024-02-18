import { useRouter } from 'next/router'
import FeedCard from '@/components/FeedCard'
import TwitterLayout from '@/components/FeedCard/layout/TwitterLayout'
import { Tweet, User } from '@/gql/graphql'
import { useCurrentUser } from '@/hooks/user'
import Image from 'next/image'

import React from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { GetServerSideProps, NextPage } from 'next'
import { graphqqlClient } from '@/clients/api'
import { getUserByIdQuery } from '@/graphql/query/user'

interface ServerProps {
  userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className=' flex gap-3 items-center py-3 px-3'>
            <BsArrowLeftShort className='text-4xl' />
            <div className=''>
              <h1 className='bold text-xl'>{props.userInfo?.firstName} </h1>
              <h1 className='bold text-md text-slate-500'>
                {props.userInfo?.tweets?.length} tweets
              </h1>
            </div>
          </nav>
          <div className='px-4 border-b border-slate-800'>
            {props.userInfo?.profileImageURL && (
              <Image
                src={props.userInfo?.profileImageURL}
                alt='user image'
                width={100}
                height={100}
                className='rounded-full'
              />
            )}
            <h1 className='bold text-xl mt-2'>
              {props.userInfo?.firstName} {props.userInfo?.lastName}
            </h1>
          </div>
          <div>
            {props?.userInfo?.tweets?.map((tweet) => (
              <FeedCard key={tweet?.id} data={tweet as Tweet} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query?.id as string | undefined
  if (!id) return { notFound: true, props: { user: undefined } }
  const userInfo = await graphqqlClient.request(getUserByIdQuery, { id })

  if (!userInfo.getUserById) return { notFound: true }

  return {
    props: {
      userInfo: userInfo.getUserById as User,
    },
  }
}

export default UserProfilePage
