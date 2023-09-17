import PropTypes from 'prop-types';
import { SideBar, SidebarItem } from './Menu/SideBar';
import { LayoutDashboard, LifeBuoy, Package, Receipt, Settings, PackagePlus, Coins, ListChecks, HelpingHand, BaggageClaim, Split, IterationCw } from 'lucide-react';
export function App(){

    return (
    <main className='App flex '>
        <SideBar>
            <SidebarItem icon = { <LayoutDashboard size={20}/>} text= 'DashBoard' alert
            />
            <SidebarItem icon = { <PackagePlus size={20}/>} text= 'Compra de Producto' active
            />
            <SidebarItem
                icon = { <BaggageClaim size={20}/>}
                text= 'Traslado retorno'                
            />
            <SidebarItem
                icon = { <Split size={20}/>}
                text= 'Distribucion salida'
            />
            <SidebarItem
                icon = { <IterationCw size={20}/>}
                text= 'Distribucion retorno'
                
            />
            <SidebarItem
                icon = { <HelpingHand size={20}/>}
                text= 'Cobranza de distribucion'
                
            />
            <SidebarItem
                icon = { <Receipt size={20}/>}
                text= 'Remesas'
                
            />
            
            <SidebarItem
                icon = { <Coins size={20}/>}
                text= 'Saldos'
                
            />
            
            <SidebarItem icon = { <ListChecks size={20}/>}
                text= 'Aprobaciones pendientes'
                
            />
            <hr className='my-3'/>
            <SidebarItem
                icon = { <Settings size={20}/>}
                text= 'Configuracion'
                
            />
            <SidebarItem
                icon = { <LifeBuoy size={20}/>}
                text= 'Ayuda'
                
            />
            
        </SideBar>
        <div className='flex flex-col w-full'>
            <div className='h-12 w-fit bg-indigo-800 min-w-full rounded-md py-2.5 px-3 m-3 text-gray-100 font-bold'>
                <h1>Hola</h1>
            </div>
        </div>
    </main>
    );
}
