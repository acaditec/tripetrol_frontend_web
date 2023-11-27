import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { getCamionesSalida } from '../helpers/getCamiones';
import Select  from 'react-select';
import { putRetornoDistribucion } from '../helpers/postCompras';
import { myAlerta } from '../ui/alerts';

export const DistribucionInPage = () => {
    const { register,handleSubmit, control } =  useForm();        
    const [listaCamiones, setListaCamiones] = useState([]);
    const [camiones, setCamiones] = useState([]);
    const [camion, setCamion] = useState([]);
    const destinos = [{value: 1,label: 'Local'},
    {value: 2,label: 'Provincia'},
    {value: 3,label: 'Planta'}]
  
    useEffect(
    () => {
      getListaCamiones()
    }, []
    )

    const getListaCamiones = async () => {
      const data = await getCamionesSalida()
      await setCamiones(data)
      const lista = await data.map(
        (e) => {
          return {value: e.id,
                  label: `Camion ${e.no_camion}`
          }
        }
      )
      await setListaCamiones(lista)
    }
    
    const onSubmit = async (data) => {
      const dataSend = {        
        garrafas_salida: camion?.carga_salida,
        carga_retorno: data.carga_retorno!= "" ? data.carga_retorno :camion?.carga_salida,
        carga_perdida: data.carga_perdida!= '0' ? data.carga_perdida: 0,
        carga_vendida: data.carga_vendida!= "" ? data.carga_vendida :camion?.carga_salida,
        id_user_retorno: 2
      }
      const resp = await putRetornoDistribucion(dataSend,camion.id)      
      if(resp.status){
        myAlerta(resp.status,'Formulario Exitoso',JSON.stringify(resp.msg),true)
      }
      else{
        myAlerta(resp.status,'Error',resp.msg,true)
      }
    }; 

      return (
        <div className='flex flex-col w-full p'>
          <div className='py-2.5 px-3 m-3 h-12 w-fit bg-indigo-800 min-w-full rounded-md  text-gray-100 font-bold'>
              <h1>Distribucion Restorno</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Selecion de Camion de retorno
                </label>
                      <Select
                        options={listaCamiones}
                        placeholder='Selecione el camion de salida'
                        onChange={(val => {
                          setCamion(camiones.find(e => e.id===val.value))
                          console.log(camiones.find(e => e.id===val.value))
                          })}
                        
                      />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Camion
                </label>
                <input className='input-form' defaultValue={camion?.no_camion} />
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Placa
                </label>
                <input className='input-form' defaultValue={camion?.placa}/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Propietario
                </label>
                <input className='input-form' defaultValue={camion?.propietario}/>
              </div>
            </div>            
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Destino
                </label>
                      <Select
                        options={destinos}               
                        inputValue={destinos.find(e=>e.value===camion?.id_destino)?.label}
                        onChange={(val) => val.value}
                        placeholder='Selecione el destino'
                        
                      />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Carga
                </label>
                <input className='input-form' type='number' defaultValue={camion?.carga_salida}/>
              </div>
            </div>  
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Carga Vendida
                </label>
                <input className='input-form' type='number' defaultValue={camion?.carga_salida} {...register('carga_vendida')}/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Carga Retornada
                </label>
                <input className='input-form' type='number' defaultValue={camion?.carga_salida} {...register('carga_retorno')}/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form' >
                  Carga Perdida
                </label>
                <input className='input-form' type='number' defaultValue={0} {...register('carga_perdida')}/>
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
