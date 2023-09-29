import PropTypes from 'prop-types';
import { SideBar, SidebarItem } from './Menu/SideBar';
import { LayoutDashboard, LifeBuoy, Package, Receipt, Settings, PackagePlus, Coins, ListChecks, HelpingHand, BaggageClaim, Split, IterationCw } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import { DistributionPage } from './Pages/DistributionPage';
import { PurchasePage } from './Pages/PurchasePage';
import { DashboardPage } from './Pages/DashboardPage';
export function App(){

    return (
    <main className='App flex '>
        <SideBar>
            <SidebarItem icon = { <LayoutDashboard size={20}/>} text= 'DashBoard' 
            />
            <SidebarItem icon = { <PackagePlus size={20}/>} text= 'Compra de Producto' path='purchase' 

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
                
        <Routes>
            <Route path='/' element={<DashboardPage/>}/>
            <Route path='/distribution' element={<DistributionPage/>}/>
            <Route path='/purchase' element={<PurchasePage/>}/>
        </Routes>
    </main>
    );
}
