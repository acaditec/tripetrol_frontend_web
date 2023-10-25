import { useEffect, useState  } from 'react'
import { getCamiones } from '../helpers/getCamiones'
import Select  from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import '../input.css'
import { Switch } from '@mui/material';
import {postCompra} from '../helpers/postCompras'



export const PurchasePage = () => {
  const [opciones, setOpciones] = useState([])
  const [camionesSelected, setCamionesSelected] = useState([])
  const destinos = [{value: 1,label: 'Local'},
  {value: 2,label: 'Provincia'},
  {value: 3,label: 'Planta'}
  
]

  const onSubmit = (data) => {
    const camiones = data.SelecionCamion?.map(e=> {return {id: e,
      garrafas_salida: data[e]}
    }
    )
    const dataSend = { cheque: data.cheque,
      monto: data.monto,
      garrafas_compradas: data.garrafas_compradas,
      id_destino: data.id_destino,
      id_user: 2,
      camiones      
    }  
    const resp = postCompra(dataSend)
    alert(JSON.stringify(resp)) 
  }
// Carga de datos iniciales
  useEffect(
    () => {
      getListaCamiones()
    }, []
    )
// Controlador de Formulario
  const { register,handleSubmit, control, watch } =  useForm();
// Funcion para extraccion de datos
  const getListaCamiones = async () => {
    const data = await getCamiones()
    const lista = await data.map(
      (e) => {
        return {value: e.id,
                label: `Camion ${e.no_camion}`
        }
      }
    )
    await setOpciones(lista)
  }


  return (
    <div className='flex flex-col w-full p'>
        <div className='py-2.5 px-3 m-3 h-12 w-fit bg-indigo-800 min-w-full rounded-md  text-gray-100 font-bold'>
            <h1>Compra de Producto</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full md:w-1/2 px-3 mb-5 md:mb-0'>
                <label className='label-form'>
                  Numero de Cheque
                </label>
                <input className='input-form' {...register("cheque")}/>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='label-form'>
                  Monto del cheque
                </label>
                <input className='input-form' type='number' step={0.01} {...register("monto")}/>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form' >
                  Numero de Garrafas
                </label>
                <input className='input-form' {...register("garrafas_compradas")}/>
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
          <label className='label-form'>
            Seleciones camiones designados
          </label>
           <Controller
              control={control}
              name="SelecionCamion"
              render={
                ({field: {onChange,value,ref}})=>(
                  <Select
                    ref={ref}
                    name='SelecionCamion'
                    options={opciones}
                    value={value ? opciones.filter((val) => value.includes(val.value)): []}
                    onChange={(val) => val.value ? onChange(val.value): onChange( val.map(c=>c.value))}
                    placeholder='Selecione los camiones para recojo'
                    closeMenuOnSelect={false}
                    isMulti
                  />
                )
              }
            />

            { watch("SelecionCamion")?.length ? 
            (<ul>
              {watch("SelecionCamion").map((e)=>{
                return <li key={e}>
                  <div className='flex flex-wrap -mx-3 mb-2 mt-2'>
                      <div className='w-full md:w-1/2 px-3 mb-5 md:mb-0'>
                        <label className='label-form'>
                          {opciones.find(o=>o.value === e).label}
                        </label>
                      </div>
                      <div className='w-full md:w-1/2 px-3'>
                        <input className='input-form' type='number' {...register(`${e}`)}/>
                      </div>
                  </div>
                </li>
              })}
            </ul>)
             : <h1></h1>}             
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Aceptar
            </button>
          </form>
        </div>
    </div>
  )
}
