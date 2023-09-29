import axios from "axios"
const url = 'https://tripetrol.azurewebsites.net/'
export async function getCamiones() {
     const camiones = await axios.get(`${url}db/camiones/`).catch((e) => {console.error(e); return ['error'];} )
     return camiones.data.camions
}