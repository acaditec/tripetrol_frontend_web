import { useEffect, useState  } from 'react'
import { getCamiones } from '../helpers/getCamiones'
import Select  from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { Hand } from 'lucide-react';
import '../input.css'
import { Switch } from '@mui/material';



export const PurchasePage = () => {
  const [camiones, setCamiones] = useState([])
  const [opciones, setOpciones] = useState([])
  const [camionesSelected, setCamionesSelected] = useState([])
  const onSubmit = (data) => alert(JSON.stringify(data)) 

  useEffect(
    () => {
      getListaCamiones()
    }, []
    )

  const { handleSubmit, control } =  useForm();

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
    await setCamiones(data.camions)
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
                <input className='input-form'/>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='label-form'>
                  Monto del cheque
                </label>
                <input className='input-form'/>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Numero de Garrafas
                </label>
                <input className='input-form'/>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Destino
                </label>
                <a className='leading-4 text-sm font-sans'>Local</a>
                <Controller
                  control={control}
                  name="switch-destino"
                  defaultValue={false}
                  render={
                    ({field: { onChange,value}}) => (
                      <Switch
                        value={value}
                        onChange={
                          (val)=>onChange(val)
                        }
                      />
                    )
                  }
                />
                <a className='leading-4 text-sm'>Provincia</a>
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
          </form>
        </div>
    </div>
  )
}
