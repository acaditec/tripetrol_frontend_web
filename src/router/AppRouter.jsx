import React from 'react'
import { PublicRoute } from './PublicRoute'
import { LoginPage } from '../Pages/LoginPage'
import { PrivateRoute } from './PrivateRoute'
import { TripetrolApp } from '../TripetrolApp'
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="login/*" element={
                <PublicRoute>
                    <Routes>
                        <Route path="/*" element={<LoginPage/>}/>
                    </Routes>
                </PublicRoute>
            }
            />
            <Route path="/*" element={
             <PrivateRoute>
                <TripetrolApp/>
             </PrivateRoute>
            }/>
        </Routes>
    </>
  )
}
