import axios from "axios";
const url = 'https://tripetrol.azurewebsites.net/'

export async function postAuth(email,pass){
    const resp = await axios.post(`${url}auth/login`,{msg: 
        {correo: email,
            password: pass,  
    }
}).then(
        (response) => {         
            return (response.data) 
        }
    ).catch( (error) => {
        return error.response.data;
    })
    return resp;

}