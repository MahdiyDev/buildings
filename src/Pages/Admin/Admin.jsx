import './Admin.scss'
import { Switch } from 'react-router-dom'
import Public from '../../Routes/Public'
import Private from '../../Routes/Private'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Create from '../Create/Create';
 
function Admin() {

    return (
        <Switch>
            <Public path='/admin/login' component={Login} />
            <Private path='/admin/create' component={Create} />
            <Private path='/admin/signup' component={SignUp} />
        </Switch>
    )
}

export default Admin;
