import { useEffect, useState  } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { getSaldo } from '../helpers/getCamiones';
import { postRemesa } from '../helpers/postCompras';
import { myAlerta } from '../ui/alerts';

export const SendMoneyPage = () => {
    const [saldo, setSaldo] = useState();
    const { register, handleSubmit, control } =  useForm();
    useEffect(
      () => {
        getSaldoFinal()
      }, []
      )
      
      const getSaldoFinal = async () => {
        const data = await getSaldo()
        await setSaldo(data)
      }
      
    const onSubmit = async (data) => {
      const dataSend = {
        orden_remesa: data?.orden_remesa,
        monto: data?.monto*1,
        id_user: 2
      }
      const resp = await postRemesa(dataSend)
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
              <h1>Remesas</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='px-3 w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Saldo en Caja
                </label>
                <input className='input-form' defaultValue={saldo?.[0].saldo_final} disabled/>
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Numero de Remesa
                </label>
                <input className='input-form'  {...register('orden_remesa')} />
              </div>
            </div> 
            <div className='flex flex-wrap -mx-3 mb-5'>
              <div className='w-full px-3'>
                <label className='label-form'>
                  Remesa
                </label>
                <input className='input-form' type='number' {...register('monto')} />
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

