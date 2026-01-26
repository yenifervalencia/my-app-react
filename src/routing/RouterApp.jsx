import React from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from '../pages/login'
import { ForgotPassword } from '../pages/ForgotPassword'

export const RouterApp = () => {
  return (
    <BrowserRouter>
    {/* contenido central y rutas */}
    <section id="content" className="content">
        <Routes>
            <Route path="/" element={<Login></Login>} ></Route>
            <Route path="/login" element={<Login></Login>} ></Route>
            <Route path="/forgot" element={<ForgotPassword></ForgotPassword>} ></Route>
        </Routes>
    </section>
    </BrowserRouter>
  )
}
