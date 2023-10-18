import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "@/components/NavBar";
import Header from "@/components/Header";
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restaurant Ordering System',
  description: 'Created by Alpha Roissul',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className='space-y-8'>
            <Header/>
            <Navbar/>
            {children}
            <Footer/>
          </div>
      </body>
    </html>
  )
}
