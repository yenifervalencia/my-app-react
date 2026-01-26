import React from 'react'

export const Spinner = () => {
    return (
        <div className='wrap-loading wrap-loading-gray'>
            <div className="flex justify-center items-center py-10">
                <div className="w-8 h-8 border-4 border-[#f9c5ff]
                    border-t-[#900090] rounded-full animate-spin"
                />
            </div>
            <div className='font-bold'>Loading....</div>
        </div>
    )
}
