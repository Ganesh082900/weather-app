import React from 'react'
import TopNav from '../navbar/TopNav'
import SideNav from '../navbar/SideNav'
import ViewLeads from '../pages/viewLeads'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <section className='w-full h-full bg-[#f5f5f5]'>
      <TopNav />
      <div className='w-full h-[90vh] flex'>
        <SideNav />
        <main className="flex-grow lg:ml-64">
          <Outlet />
        </main>
      </div>
    </section>
  )
}
