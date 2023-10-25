import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { getCobrosIncompletos } from '../helpers/getCamiones';
import Select  from 'react-select';
import { putCompletarCobro } from '../helpers/postCompras';

export const PaymentsPage = () => {

       
    const [listaCobros, setListaCobros] = useState([]);
    const [cobros, setCobros] = useState([]);
    const [cobro, setCobro] = useState([]);
    const { register, handleSubmit, control, watch } =  useForm();
    const destinos = [{value: 1,label: 'Local'},
    {value: 2,label: 'Provincia'},
    {value: 3,label: 'Planta'}]
    useEffect(
      () => {
        getListaCamiones()
      }, []
      )
      const getListaCamiones = async () => {
        const data = await getCobrosIncompletos()
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
          renta_cobrada: data.renta_cobrada!= "" ? data.renta_cobrada*1 : cobro?.monto_a_cobrar,
          renta_por_cobrar: data.renta_cobrada!= "" ? cobro?.monto_a_cobrar - data.renta_cobrada : 0,
          id_camion: cobro?.id_camion,
          id_distribucion: cobro?.id_distribucion,
          id_user: 2,
        } 
        putCompletarCobro(dataSend,cobro?.id)
        alert(JSON.stringify(dataSend))
      }; 
  
  
      return (
        <div className='flex flex-col w-full p'>
          <div className='py-2.5 px-3 m-3 h-12 w-fit bg-indigo-800 min-w-full rounded-md  text-gray-100 font-bold'>
              <h1>Cobranzas de distribucion</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Selecion de Cobro de retorno
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
                  Orden de Distribucion
                </label>
                <input className='input-form' defaultValue={cobro?.id_distribucion} />
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
                  Nombre de Propietario
                </label>
                <input className='input-form' defaultValue={cobro?.propietario} />
              </div>
            </div>  
                      
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Destino
                </label>
                      <Select
                        options={destinos}               
                        inputValue={destinos.find(e=>e.value===cobro?.id_destino)?.label}
                        onChange={(val) => val.value}
                        placeholder='Selecione el destino'
                        
                      />
              </div>
            </div>
            
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Numero de garrafas vendidas
                </label>
                <input className='input-form' defaultValue={cobro?.carga_vendida} />
              </div>
            </div> 
            
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Renta a Cobrar
                </label>
                <input className='input-form' defaultValue={cobro?.monto_a_cobrar} />
              </div>
            </div>  
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Renta a Cobrar
                </label>
                <input className='input-form' type='number' defaultValue={cobro?.monto_a_cobrar} />
              </div>
            </div>              
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Renta Cobrada
                </label>
                <input className='input-form' type='number' defaultValue={cobro?.monto_a_cobrar} {...register('renta_cobrada')} />
              </div>
            </div>                
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Renta por cobrar
                </label>
                <input className='input-form' type='number' value={(cobro?.monto_a_cobrar - watch('renta_cobrada'))>0 ? (cobro?.monto_a_cobrar - (watch('renta_cobrada')>0 ? watch('renta_cobrada') : 0)) : 0 } disabled />
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