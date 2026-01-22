import { useState } from 'react'
import { Input } from '../components/Input'

export const Login = () => {
    const [user, setUser] = useState('')
    const [passw, setPassw] = useState('')

    const send = async () => {
        const url = 'https://api-dev.autocore.pro/v2/auth/login';
        const form = {
            email: user,
            password: passw
        }
        let search = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        });
        let data = await search.json();
        if (data) {
            alert('Inicio correctamente')
            console.log(data)
        }
    }

    return (
        <>

            <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
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


                <div className='w-full flex flex-col justify-center items-center p-5 gap-4'>
                    <h1 className='font-bold text-3xl mb-5'>User Login</h1>
                    <div className='w-3/4 gap-4 flex flex-col'>
                        <Input type='text' placeholder='User' value={user} change={setUser}></Input>
                        <Input type='password' placeholder='Password' value={passw} change={setPassw}></Input>
                        <button onClick={send} disabled={!user && !passw} className='text-white gradient-color font-bold w-full rounded-[20px] p-2'>Login</button>

                    </div>
                    <div>
                        <p className='text-[#808080] text-[11px] font-bold'>Forgot username or password?</p>
                    </div>

                </div>
            </div>
        </>
    )
}
