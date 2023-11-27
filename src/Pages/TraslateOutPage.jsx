import React from 'react'
import { Controller, useForm } from 'react-hook-form';

export const TraslateOutPage = () => {
    const onSubmit = (data) => alert(JSON.stringify(data)); 
    const { handleSubmit, control } =  useForm();
  
      return (
        <div className='flex flex-col w-full p'>
          <div className='py-2.5 px-3 m-3 h-12 w-fit bg-indigo-800 min-w-full rounded-md  text-gray-100 font-bold'>
              <h1>Traslado Salida</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Orden de Salida
                </label>
                <input className='input-form'/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Camion
                </label>
                <input className='input-form'/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Placa
                </label>
                <input className='input-form'/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Propietario
                </label>
                <input className='input-form'/>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Carga Salida
                </label>
                <input className='input-form'/>
              </div>
            </div>  
            </form>
          </div>
      </div>
      )
}
