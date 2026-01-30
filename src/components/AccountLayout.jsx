import React from 'react'
import { Backgroup } from './Backgroup'
import { Outlet } from "react-router-dom"

export const AccountLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      <Backgroup></Backgroup>
      <div className="flex flex-col justify-center items-center p-5 gap-4">
        <Outlet />
      </div>
    </div>
  )
}
