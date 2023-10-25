import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Select  from 'react-select';
import { getCamionesSalida, getSaldoCamiones } from '../helpers/getCamiones';
import { postSaldo } from '../helpers/postCompras';

export const BalancePage = () => {
    
    const { register, handleSubmit, control } =  useForm();  
    const [listaCobros, setListaCobros] = useState([]);
    const [cobros, setCobros] = useState([]);
    const [cobro, setCobro] = useState([]);
    useEffect(
      () => {
        getListaCamiones()
      }, []
      )
      const getListaCamiones = async () => {
        const data = await getSaldoCamiones()
        await setCobros(data)
        const lista = await data.map(
          (e) => {
            return {value: e.id,
                    label: `Camion ${e.no_camion}`
            }
          }
        )
        await setListaCobros(lista)
      }
    
    const onSubmit = (data) => {
      const dataSend = {
        id_camion: cobro?.id_camion,
        monto: data.monto*1,
        id_user: 2
      }
      alert(JSON.stringify(dataSend));
      postSaldo(dataSend)
    } 

      return (
        <div className='flex flex-col w-full p'>
          <div className='py-2.5 px-3 m-3 h-12 w-fit bg-indigo-800 min-w-full rounded-md  text-gray-100 font-bold'>
              <h1>Saldos</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Selecion de Camion con saldos
                </label>
                      <Select
                        options={listaCobros}
                        placeholder='Selecione el camion de cobro'
                        onChange={(val => {
                          setCobro(cobros.find(e => e.id===val.value))
                          console.log(cobros.find(e => e.id===val.value))
                          })}
                        
                      />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Nro de Camion
                </label>
                <input className='input-form' defaultValue={cobro?.no_camion} />
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Nro de Placa
                </label>
                <input className='input-form' defaultValue={cobro?.placa} />
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Saldo
                </label>
                <input className='input-form' defaultValue={cobro?.saldo_final} />
              </div>
            </div> 
            
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Monto a Pagar
                </label>
                <input className='input-form' type='number' {...register('monto')}/>
              </div>
            </div> 
            
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Aceptar
            </button>
            </form>
          </div>
      </div>
      )
}
