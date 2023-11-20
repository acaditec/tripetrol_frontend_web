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

export async function postReporteDistribucion(data){

    //`${url}excel/reporte`

       const resp = await axios({
            url: `http://localhost:8080/excel/reporte`, //your url
            method: 'POST',
            responseType: 'blob', // important
            data: {token: 1234, msg: data}
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
            return {status: true,
                    msg: []};
        }).catch(
            (e) => {
                return e.response.data
            }
        );
    return resp;
}