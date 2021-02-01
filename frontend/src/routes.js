import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Inflows from './pages/Inflows'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/inflow' component={Inflows} />
            </Switch>
        </BrowserRouter>
    )
}