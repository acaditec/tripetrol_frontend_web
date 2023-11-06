import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { getOrdenesSalida } from '../helpers/getCamiones';
import Select  from 'react-select';
import { putRetornoTraslado } from '../helpers/postCompras';
import { myAlerta } from '../ui/alerts';

export const TraslateInPage = () => {
    const { register,handleSubmit, control } =  useForm();
    const [listaOrdenes, setlistaOrdenes] = useState([]);
    const [ordenesSalida, setOrdenesSalida] = useState([]);
    const [orden, setOrden] = useState()
    const destinos = [{value: 1,label: 'Local'},
    {value: 2,label: 'Provincia'},
    {value: 3,label: 'Planta'}]
    //inicializadores
    useEffect(
      () => {
        getOrdenes()
      }, []
      )
     //recepcion de datos 
    const getOrdenes = async () => {
      const data = await getOrdenesSalida()
      await setOrdenesSalida(data)
      const lista = await data.map(
        e => {
          return {
            value: e.id,
            label: `Camion ${e.no_camion}`
          }
        }
      )
      await setlistaOrdenes(lista)      
    }
    //carga de datos
    const onSubmit = async (data) =>{
      const dataPut = {
        id_destino: orden?.id_destino,
        garrafas_salida: orden?.garrafas_salida,
        garrafas_retorno: data.garrafas_retorno!= "" ? data.garrafas_retorno :orden?.garrafas_salida,
        garrafas_perdidas: data.garrafas_perdidas!= '0' ? data.garrafas_perdidas: 0,
        id_user_retorno: 2
      }
      const resp = await putRetornoTraslado(dataPut,orden.id)
      
    console.log(resp)
    if(resp.status){
      myAlerta(resp.status,'Formulario Exitoso',JSON.stringify(resp.data),true)
    }
    else{
      myAlerta(resp.status,'Error',JSON.stringify(resp.data),true)
    }
    }; 
  
      return (
        <div className='flex flex-col w-full p'>
          <div className='py-2.5 px-3 m-3 h-12 w-fit bg-indigo-800 min-w-full rounded-md  text-gray-100 font-bold'>
              <h1>Traslado Retorno</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Selecion de Camion de retorno
                </label>
                      <Select
                        options={listaOrdenes}
                        placeholder='Selecione el camion de retorno'
                        onChange={(val => {
                          setOrden(ordenesSalida.find(e => e.id===val.value))
                          console.log(ordenesSalida.find(e => e.id===val.value))
                          })}
                        
                      />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Orden de Salida
                </label>
                <input className='input-form' defaultValue={orden?.id }/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Camion
                </label>
                <input className='input-form' defaultValue={orden?.no_camion }/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Placa
                </label>
                <input className='input-form' defaultValue={orden?.placa }/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Propietario
                </label>
                <input className='input-form' defaultValue={orden?.propietario }/>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Destino
                </label>
                      <Select
                        options={destinos}               
                        inputValue={destinos.find(e=>e.value===orden?.id_destino)?.label}
                        onChange={(val) => val.value}
                        placeholder='Selecione el destino'
                        
                      />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Carga Salida
                </label>
                <input className='input-form' defaultValue={orden?.garrafas_salida }/>
              </div>
            </div>  
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Carga Retorno
                </label>
                <input className='input-form' defaultValue={orden?.garrafas_salida } {...register('garrafas_retorno')}/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Perdidas
                </label>
                <input className='input-form' defaultValue={0} {...register('garrafas_perdidas')}/>
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
