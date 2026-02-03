import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className="flex flex-col justify-center items-center p-5 gap-4">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
