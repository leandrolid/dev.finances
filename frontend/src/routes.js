import {
    BrowserRouter,
    //Switch, 
    Route
} from 'react-router-dom';

import Login from './pages/login'
import Dashboard from './pages/dashboard'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/dashboard' component={Dashboard} />
        </BrowserRouter>
    )
}