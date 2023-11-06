import React from 'react'
import { useEffect, useState  } from 'react'
import '../input.css'
import { Controller, useForm } from 'react-hook-form';
import { getCamiones } from '../helpers/getCamiones';
import Select  from 'react-select';
import { postDistribucionSalida } from '../helpers/postCompras';
import { myAlerta } from '../ui/alerts';

export const DistributionOutPage = () => {
  
  const { register, handleSubmit, control } =  useForm();
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
      const data = await getCamiones()
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

    const onSubmit = async (data) =>  {
      const dataSend = {
        id_camion: camion.id,
        id_destino: data.id_destino,
        carga_salida: data.carga_salida,
        id_user_salida: 2
      }
      const resp = await postDistribucionSalida(dataSend)      
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
            <h1>Distribucion Salida</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
          <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Selecion de Camion de salida
                </label>
                      <Select
                        options={listaCamiones}
                        placeholder='Selecione el camion de salida'
                        onChange={(val => {
                          setCamion(camiones.find(e => e.id===val.value))
                          })}
                        
                      />
              </div>
            </div>
          <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Camion
                </label>
                <input className='input-form' defaultValue={camion?.no_camion}/>
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
                <Controller
                  control={control}
                  name="id_destino"
                  render={
                    ({field: { onChange,value, ref}}) => (
                      <Select
                        ref={ref}
                        name='id_destino'
                        options={destinos}
                        onChange={(val) => onChange(val.value)}
                        placeholder='Selecione el destino'
                        
                      />
                    )
                  }
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Carga
                </label>
                <input className='input-form' type='number' {...register("carga_salida")}/>
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
