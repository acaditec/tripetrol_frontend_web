import axios from "axios";
const url = 'https://tripetrol.azurewebsites.net/'

export async function postAuth(email,pass){
    const resp = await axios.post(`${url}auth/login`,{msg: 
        {correo: email,
            password: pass,  
    }
}).then(
        (response) => {  
            console.log(response)          
            return (response.data) 
        }
    ).catch( (error) => {
        return false;
    })
    return resp;

}