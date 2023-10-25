import {createContext, useContext, useState} from 'react'
import {ChevronFirst, ChevronLast, MoreVertical} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';


const SidebarContext = createContext()
export const SideBar = ({children}) => {
  const { user, logout } = useContext( AuthContext );
    

  const navigate = useNavigate();

  const onLogout = () => {
      logout();
      navigate('/login', {
          replace: true
      });
  }
  const [expanded, setExpanded] = useState(true)
  return (
    <aside className='h-screen'>
     <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
      <div className='p-4 pb-2 flex justify-between items-center'>
        <img src="https://img.logoipsum.com/243.svg" 
        className={`overflow-hidden transition-all ${expanded ? "w32" : "w-0"}`} 
        alt="" />
        <button onClick={()=> setExpanded( curr => !curr)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
          {expanded ? <ChevronFirst /> : <ChevronLast/>}
        </button>
      </div>
      <SidebarContext.Provider value = {{expanded}}>
        <ul className='flex-1 px-3'>{children}</ul>
      </SidebarContext.Provider>
      <div className='border-t flex p-3'>
        <img 
          src='https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
          alt=''
          className='w-10 h-10 rounded-md'
        />
        <div 
        className={`flex justify-between items-center
        overflow-hidden transition-all
         ${expanded ? "w-52 ml-3": "w-0"}`}>
          <div className='leading-4'>
            <h4 className='font-semibold'>{user?.name}</h4>
            <span className='text-xs text-gray-600'>jp.fernandez.jpfm@gmail.com</span>
          </div>
          <button onClick={onLogout}>
            <MoreVertical size={20}/>
          </button>
        </div>
      </div>
     </nav>
    </aside>
  )
}

export function SidebarItem({icon, text, active, alert, path=''}) {
  const {expanded} = useContext( SidebarContext)
  return (
    <NavLink to={`/${path}`}>
    <li className={`relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer transition-colors group ${
      active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"
    }
    `}>
      {icon}
      <span className={`overflow-hidden transition-all
      ${expanded ? "w-52 ml": 'w-0'}
      `}      >{text}</span>
      {alert && 
      <div 
      className={`absolute right-2 w-2 h-2 rounded
       bg-indigo-400 ${expanded ? "" : "top-2"} `}

       />}
       {
        !expanded && <div className={`
        absolute left-full rounded-md px-2 py-1 ml-6
        bg-indigo-100 text-indigo-800 text-sm
        invisible opacity-20 transition-all
        group-hover:visible group-hover:opacity-100 group-hover: translate-x-0
        `}>
          {text}
        </div>
       }
    </li>
    </NavLink>
  )
}
