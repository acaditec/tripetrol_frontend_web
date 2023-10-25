import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../input.css'

export const LoginPage = () => {

    const { login } = useContext( AuthContext );
    const navigate = useNavigate();
    const onLogin = () => {
        const lastPath = localStorage.getItem('lastPath') || '/';
        login('Juan Pablo Fernandez');

        navigate(
            lastPath, {
                replace: true
            }
        )

    }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Correo
                </label>
                <input className='input-form' />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Password
                </label>
                <input className='input-form'  />
              </div>
            </div>
      <button 
        className="btn btn-primary"
        onClick={ onLogin }
      >
        Login
      </button>

    </div>
  )
}
