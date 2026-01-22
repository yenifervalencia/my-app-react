import React from 'react'

export const Input = ({type='text',placeholder, value,change}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => change(e.target.value)}
        className="px-3 w-full rounded bg-gray-200 h-11 border border-gray-300 rounded-lg
        outline-none focus:ring-1"
      />
    </div>
  )
}
