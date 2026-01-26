import React from 'react'

export const Backgroup = () => {
    return (
        <div className="relative hidden md:block overflow-hidden">
            <div className="absolute left-[15rem] top-[-150px] w-[160px] h-[380px]
                    gradient-color rounded-b-[600px] rotate-[-45deg]" />

            <div className="absolute top-[-30px] left-[-50px] w-[390px] h-[650px] 
                        bg-gradient-to-br from-pink-100 via-purple-300 to-purple-400 rounded-b-[750px] rotate-[-45deg]"  >
                <div className="absolute top-[-40px] left-[30px] w-[330px] h-[590px] 
                        gradient-color rounded-b-[750px]">

                </div>
            </div>

            <div className="absolute -left-[9rem] top-[21rem] w-[160px] h-[360px]
                    gradient-color rounded-b-[600px] rotate-[-45deg]" />

            <div className="absolute left-[30rem] bottom-[-7rem] w-[100px] h-[240px]
                    bg-gradient-to-br from-orange-300 to-pink-400
                    rounded-t-[600px] rotate-[-45deg]" />
        </div>
    )
}
