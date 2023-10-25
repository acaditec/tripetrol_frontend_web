import { SideBar, SidebarItem } from './Menu/SideBar';
import { LayoutDashboard, LifeBuoy, Package, Receipt, Settings, PackagePlus, Coins, ListChecks, HelpingHand, BaggageClaim, Split, IterationCw, Truck } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import { PurchasePage } from './Pages/PurchasePage';
import { DashboardPage } from './Pages/DashboardPage';
import { TraslateOutPage } from './Pages/TraslateOutPage';
import { TraslateInPage } from './Pages/TraslateInPage';
import { DistributionOutPage } from './Pages/DistributionOutPage';
import { DistribucionInPage } from './Pages/DistribucionInPage';
import { PaymentsPage } from './Pages/PaymentsPage';
import { SendMoneyPage } from './Pages/SendMoneyPage';
import { BalancePage } from './Pages/BalancePage';
export function TripetrolApp(){

    return (
    <main className='App flex '>
        <SideBar>
            <SidebarItem icon = { <LayoutDashboard size={20}/>} text= 'DashBoard' 
            />
            <SidebarItem icon = { <PackagePlus size={20}/>} text= 'Compra de Producto' path='purchase' 

            />
            <SidebarItem
                icon = { <Truck size={20}/>}
                text= 'Traslado salida' 
                path='traslateout'
            />
            <SidebarItem
                icon = { <BaggageClaim size={20}/>}
                text= 'Traslado retorno'   
                path='traslatein' 
            />
            <SidebarItem
                icon = { <Split size={20}/>}
                text= 'Distribucion salida' 
                path='distributionout' 
            />
            <SidebarItem
                icon = { <IterationCw size={20}/>}
                text= 'Distribucion retorno'    
                path='distributionin'
            />
            <SidebarItem
                icon = { <HelpingHand size={20}/>}
                text= 'Cobranza de distribucion' 
                path='payments'   
                
            />
            <SidebarItem
                icon = { <Receipt size={20}/>}
                text= 'Remesas'
                path='remesas'
                
            />
            
            <SidebarItem
                icon = { <Coins size={20}/>}
                text = 'Saldos'
                path ='balance'
                
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
            <Route path='/purchase' element={<PurchasePage/>}/>
            <Route path='/traslateout' element={<TraslateOutPage/>}/>
            <Route path='/traslatein' element={<TraslateInPage/>}/>
            <Route path='/distributionout' element={<DistributionOutPage/>}/>
            <Route path='/distributionin' element={<DistribucionInPage />}/>
            <Route path='/payments' element={<PaymentsPage />}/>
            <Route path='/remesas' element={<SendMoneyPage />}/>
            <Route path='/balance' element={<BalancePage />}/>
        </Routes>
    </main>
    );
}
