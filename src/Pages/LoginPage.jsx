import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../input.css'

export const LoginPage = () => {
  
    const { register, handleSubmit, control } =  useForm();

    const { login } = useContext( AuthContext );
    const navigate = useNavigate();
    const onLogin = () => {

    }
    const onSubmit = (data) => {
      const lastPath = localStorage.getItem('lastPath') || '/';
      login('Juan Pablo Fernandez', data.email, data.pass);

      navigate(
          lastPath, {
              replace: true
          }
      )
      alert(JSON.stringify(data))
    };

  return (
    <div className="container mt-5">
      <h1>Login Page</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-wrap -mx-3 mb-5'>
                <div className='w-full px-3'>
                  <label className='label-form'>
                    Correo
                  </label>
                  <input className='input-form' {...register('email')}/>
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-5'>
                <div className='w-full px-3'>
                  <label className='label-form'>
                    Password
                  </label>
                  <input className='input-form' {...register('pass')}/>
                </div>
              </div>
                      
              <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Login
            </button>
      </form>
      

    </div>
  )
}
