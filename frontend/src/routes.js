import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Inflows from './pages/Inflows'
import Outflows from './pages/Outflows'

export default function Routes(){
    return (
        <BrowserRouter>
            
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/inflow' component={Inflows} />
                <Route path='/outflow' component={Outflows} />
            
        </BrowserRouter>
    )
}