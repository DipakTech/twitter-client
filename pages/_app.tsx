import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId='1011426307352-vo634uvsc09sf3q6d4rp23p1pt0s2g6m.apps.googleusercontent.com'>
      <div className={inter.className}>
        <Component {...pageProps} />
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  )
}
