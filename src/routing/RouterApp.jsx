import React from 'react'
import { Route, BrowserRouter, Routes, Navigate  } from "react-router-dom";
import { Login } from '../pages/login'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Backgroup } from '../components/Backgroup';
import { AccountLayout } from '../components/AccountLayout';
import { Transactions } from '../pages/Transactions';
import { MainLayout } from '../components/MainLayout';

export const RouterApp = () => {
  const isAuth = !!localStorage.getItem("token")

  return (
      <Routes>

      {/* RUTAS PUBLICAS (NO LOGIN) */}
      {!isAuth && (
        <Route element={<AccountLayout></AccountLayout>}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      )}

      {/* RUTAS PRIVADAS (LOGUEADO) */}
      {isAuth && (
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/transactions" element={<Transactions></Transactions>} />
          <Route path="*" element={<Navigate to="/transactions" />} />
        </Route>
      )}

    </Routes>
  )
}
