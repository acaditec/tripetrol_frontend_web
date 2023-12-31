import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

import { types } from '../types/types';
import { postAuth } from '../helpers/auth';

const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );
  
    return {
      logged: !!user,
      user: user,
    }
  }

export const AuthProvider = ({children}) => {

    const [authState,dispatch] = useReducer(authReducer, {}, init);

    const login = async (name = '',email,pass) => {
            const resp = await postAuth(email,pass)
            if(resp.status){
              const usuario = resp.msg.usuario;
              const user = { id: usuario.id, 
                            name: `${usuario.nombre} ${usuario.apellidos}`,
                            
                            token:  usuario.token
                          }
              const action = { type: types.login, payload: user }          
              localStorage.setItem('user', JSON.stringify( user ) );          
              dispatch(action);
              return resp

            } else {              
              localStorage.removeItem('user');
              const action = { type: types.logout };
              dispatch(action);
              return resp
            }
    }
    const logout = () => {
        localStorage.removeItem('user');
        const action = { type: types.logout };
        dispatch(action);
    }

      return (
        <AuthContext.Provider value={{
          ...authState,
    
          // Methods
          login,
          logout,
        }}>
            { children }
        </AuthContext.Provider>
      );
}
