import { useState } from 'react'
import { Input } from '../components/Input'
import { NavLink } from 'react-router-dom'
import { Backgroup } from '../components/Backgroup'
import { Spinner } from '../components/Spinner'
import { IsValidEmail } from '../utils/FormValidations'


export const Login = () => {
    const [user, setUser] = useState('')
    const [passw, setPassw] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({});

    const validateStep = () => {
        const newErrors = {};

        if (!IsValidEmail(user)) {
            newErrors.email = "Correo inválido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const send = async () => {
        if (!validateStep()) return;
        try {
            setLoading(true)
            const url = 'https://api-dev.autocore.pro/v2/auth/login';
            const form = {
                email: user,
                password: passw
            }
            let loginSend = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            if (!loginSend.ok) {
                const errorData = await loginSend.json();
                alert(errorData?.detail || 'Error inesperado');
                setLoading(false)

            }
            let data = await loginSend.json();
            if (data) {
                alert('Inicio correctamente')
                setLoading(false)
            }
        } catch (error) {
            alert(error.detail);
            setLoading(false)
        }

    }

    return (
        <>

            <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
                <Backgroup></Backgroup>
                {loading && (
                    <Spinner></Spinner>
                )}
                <div className='w-full flex flex-col justify-center items-center p-5 gap-4'>
                    <h1 className='font-bold text-3xl mb-5'>User Login</h1>
                    <div className='w-3/4 gap-4 flex flex-col'>
                        <Input type='text' placeholder='User' value={user} change={setUser}></Input>
                        {errors.email && (
                            <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                        <Input type='password' placeholder='Password' value={passw} change={setPassw}></Input>
                        <button onClick={send} disabled={!user && !passw} className='text-white gradient-color font-bold w-full rounded-[20px] p-2'>Login</button>
                    </div>
                    <div>
                        <ul>
                            <li className='text-[#808080] text-[11px] font-bold'><NavLink to="/forgot">Forgot username or password?</NavLink></li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}
