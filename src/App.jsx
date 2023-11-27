import React from 'react'
import { AuthProvider } from './context'
import { AppRouter } from './router/AppRouter'

export const App = () => {
  return (
    <AuthProvider>
        <AppRouter/>
    </AuthProvider>
  )
}
