import axios from "axios"
const url = 'https://tripetrol.azurewebsites.net/'
export async function getCamiones() {
     const camiones = await axios.get(`${url}db/camiones/`).catch((e) => {console.error(e); return ['error'];} )
     return camiones.data.camions
}
export async function getOrdenesSalida() {
     const resp = await axios.get(`${url}db/compras/ordenesSalida`).catch((e) => {console.error(e); return ['error'];} )
     return resp.data.msg.ordenesSalida
}

export async function getCamionesSalida() {
     const resp = await axios.get(`${url}db/distribuciones/ordenSalida`).catch((e) => {console.error(e); return ['error'];} )
     return resp.data.msg.ordenesSalida
}

export async function getCobrosIncompletos() {
     const resp = await axios.get(`${url}db/cobranzas/cobranzasI`).catch((e) => {console.error(e); return ['error'];} )
     return resp.data.msg.ordenesSalida
}

export async function getSaldo() {
     const resp = await axios.get(`${url}db/cobranzas/saldoCaja`).catch((e) => {console.error(e); return ['error'];} )
     return resp.data.msg.saldo
}

export async function getSaldoCamiones() {
     const resp = await axios.get(`${url}db/cobranzas/camionesSaldos`).catch((e) => {console.error(e); return ['error'];} )
     return resp.data.msg.camiones
}

