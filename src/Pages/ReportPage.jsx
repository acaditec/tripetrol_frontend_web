import axios from 'axios';
import React from 'react';
import DatePicker from 'react-datepicker';
import {Controller, useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import { json } from 'react-router-dom';
import { postReporteDistribucion } from '../helpers/postCompras';

export const ReportPage = () => {
    
  const { register, handleSubmit, control } =  useForm();

    const onSubmit = async (data) =>  {
      const dataSend = {
        date_inicio: data.date_inicio,
        date_final: data.date_final
      }
      postReporteDistribucion(dataSend)
    }; 
    const onDowload = async () => {        
        await axios({
            url: 'https://tripetrol.azurewebsites.net/excel/reporte', //your url
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);
        
            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('reporte', 'file.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        
            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
        //await axios.get(`https://tripetrol.azurewebsites.net/excel/reporte`)
    }
  return (
    <div className='flex flex-col w-full p'>
    <div className='py-2.5 px-3 m-3 h-12 w-fit bg-indigo-800 min-w-full rounded-md  text-gray-100 font-bold'>
        <h1>Reportes</h1>
    </div>
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
        <div className='flex flex-wrap -mx-3 mb-5'>
          <div className='w-full md:w-1/2 px-3 mb-5 md:mb-0'>
            <label className='label-form'>
              Reporte Distribucion
            </label>
          </div>
          
        </div>
        <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full md:w-1/2 px-3 mb-5 md:mb-0'>
                <label className='label-form'>
                  Desde:
                </label>
                <Controller
                    control={control}
                    name='date_inicio'
                    render={({ field }) => (
                      <DatePicker
                        placeholderText='Desde'
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                      />
                  )}
                  />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='label-form'>
                  Hasta
                </label>
                <Controller
                    control={control}
                    name='date_final'
                    render={({ field }) => (
                      <DatePicker
                        placeholderText='Hasta'
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                      />
                  )}
                  />
              </div>
            </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Descargar
        </button>
      </form>
    </div>
</div>
  )
}
