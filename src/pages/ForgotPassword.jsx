import React, { useState } from 'react'
import { Backgroup } from '../components/Backgroup'
import { Input } from '../components/Input'
import { useNavigate, NavLink } from "react-router-dom";
import { Spinner } from '../components/Spinner';
import { IsValidEmail, IsValidOtp } from '../utils/FormValidations';


export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(0)
  const [otp, setOtp] = useState('')
  const [password, setPassw] = useState('')
  const [newPassword, setNewPassw] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [steppers, setStepper] = useState([
    { name: 'Email', id: 1, enabled: true, validate: true },
    { name: 'OTP', id: 2, enabled: false, validate: false },
    { name: 'New Password', id: 3, enabled: false, validate: false },
  ])  

  const validateStep = () => {
    const newErrors = {};

    if (step === 0 && !IsValidEmail(email)) {
      newErrors.email = "Correo inválido";
    }

    if (step === 1 && !IsValidOtp(otp)) {
      newErrors.otp = "El OTP debe tener 6 dígitos";
    }

    if (step === 2) {
      if (!password || !newPassword) {
        newErrors.password = "La contraseña es obligatoria";
      } else if (password !== newPassword) {
        newErrors.password = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const selectStepper = (index) => {
    if (!steppers[index].validate) return;

    const updated = steppers.map((step, i) => ({
      ...step,
      enabled: i === index,
    }));

    setStepper(updated);
    setStep(index);
  };


  const getOtp = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true)
      const response = await fetch(
        'https://api-dev.autocore.pro/v2/auth/forgot-password',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData?.detail || 'Error inesperado');
        setLoading(false)
      }

      // Avanza step
      setStepper(prev =>
        prev.map((s, i) => ({ ...s, enabled: i === 1 }))
      );
      setStep(1);
      setErrors({});
      alert(data.msg);
      setLoading(false)

    } catch (error) {
      alert(error.detail);
      setLoading(false)
    }
  };

  const validatedOtp = async () => {
    if (!validateStep()) return;
    try {
      setLoading(true)
      const url = 'https://api-dev.autocore.pro/v2/auth/validate-otp';
      const form = {
        email: email,
        otp: otp
      }
      let validated = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });
      if (!validated.ok) {
        const errorData = await validated.json();
        alert(errorData?.detail || 'Error inesperado');
        setLoading(false)

      }
      let data = await validated.json();
      if (data) {
        const updated = steppers.map((step, i) => ({
          ...step,
          enabled: i === 2,
        }))
        setStepper(updated);
        setStep(2);
        alert(data.msg);
        setLoading(false)
      }
    } catch (error) {
      const errorData = await validated.json();
      alert(errorData?.detail || 'Error inesperado');
      setLoading(false)
    }

  }
  const changePassword = async () => {
    if (!validateStep()) return;
    try {
      setLoading(true)
      const url = 'https://api-dev.autocore.pro/v2/auth/recovery-password';
      const form = {
        email: email,
        otp: otp,
        new_password: password,
        confirm_password: newPassword
      }
      let change = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });
      if (!change.ok) {
        const errorData = await change.json();
        alert(errorData?.detail || 'Error inesperado');
        setLoading(false)

      } let data = await change.json();
      if (data) {
        alert(data.msg);
        setLoading(false)
        navigate('/login')
      }
    } catch (error) {
      const errorData = await change.json();
      alert(errorData?.detail || 'Error inesperado');
      setLoading(false)
    }

  }

  return (

    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {loading && (
        <Spinner></Spinner>
      )}
      <Backgroup></Backgroup>
      <div className='w-full flex flex-col justify-center items-center p-5 gap-4'>
        <h1 className='font-bold text-3xl mb-5'>Reset Password</h1>
        <div className='grid grid-cols-3 gap-2'>
          {
            steppers.map((res, index) => (
              <div key={res.id} className='flex gap-1' onClick={() => selectStepper(index)} >
                <div className={res.enabled ? 'stepper' : 'stepper-disableb'}>{res.id}</div>
                <div className='text-gray-500 font-bold'>{res.name}</div>
              </div>
            ))
          }

        </div>
        <div className='w-3/4'>
          {step === 0 ?
            <div className='gap-4 flex flex-col'>
              <Input type='email' placeholder='Email' value={email} change={setEmail}></Input>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
              <button onClick={getOtp} disabled={!email} className='text-white gradient-color font-bold w-full rounded-[20px] p-2'>Send</button>
            </div>
            : step === 1 ?
              <div className='gap-4 flex flex-col'>
                <Input type='text' placeholder='OTP' value={otp} change={setOtp}></Input>
                {errors.otp && (
                  <p className="text-red-500 text-xs">{errors.otp}</p>
                )}
                <button onClick={validatedOtp} disabled={!otp} className='text-white gradient-color font-bold w-full rounded-[20px] p-2'>Validation OTP</button>

              </div> :
              <div className='gap-4 flex flex-col'>
                <Input type='password' placeholder='New Password' value={password} change={setPassw}></Input>
                <Input type='password' placeholder='Confirm Password' value={newPassword} change={setNewPassw}></Input>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}

                <button onClick={changePassword} disabled={!password && !newPassword} className='text-white gradient-color font-bold w-full rounded-[20px] p-2'>Change Password</button>
              </div>
          }
          <div className='mt-8'>
            <ul>
              <li className='text-[#808080] text-[11px] font-bold'><NavLink to="/login">Return to Login</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
