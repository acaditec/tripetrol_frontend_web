import axios from "axios";
const url = 'https://tripetrol.azurewebsites.net/'
export async function postCompra(data) {
    const resp = await axios.post(`${url}db/compras/compra`,{token: 1234,
        msg: data},
    {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
    }).then(
        (response) => {return response.data;}
    ).catch(
        (e) => {
            return e.response.data
        }
    )
    return resp;
}

export async function putRetornoTraslado(data,id){
    const resp = await axios.put(`${url}db/compras/ordenRetorno/${id}`,{token: 1234, msg: data}).then(
        (response) => {return response.data;} 
    ).catch(
        (e) => {
            return e.response.data
        }
    )
    return resp;
}


export async function postDistribucionSalida(data){
    const resp = await axios.post(`${url}db/distribuciones/distribucion`,{token: 1234, msg: data}).then(
        (response) => {return response.data;} 
        ).catch(
            (e) => {
                return e.response.data
            }
        )
        return resp;
}

export async function putRetornoDistribucion(data,id){
    const resp = await axios.put(`${url}db/distribuciones/ordenRetorno/${id}`,{token: 1234, msg: data}).then(
        (response) => {return response.data;} 
        ).catch(
            (e) => {
                return e.response.data
            }
        )
        return resp;
}

export async function putCompletarCobro(data,id){
    const resp = await axios.put(`${url}db/cobranzas/cobranza/${id}`,{token: 1234, msg: data}).then(
        (response) => {return response.data;} 
        ).catch(
            (e) => {
                return e.response.data
            }
        )
        return resp;
}

export async function postRemesa(data){
    const resp = await axios.post(`${url}db/cobranzas/remesa`,{token: 1234, msg: data}).then(
        (response) => {return response.data;} 
        ).catch(
            (e) => {
                return e.response.data
            }
        )
        return resp;
}

export async function postSaldo(data){
    const resp = await axios.post(`${url}db/cobranzas/saldo`,{token: 1234, msg: data}).then(
        (response) => {return response.data;} 
        ).catch(
            (e) => {
                return e.response.data
            }
        )
        return resp;
}