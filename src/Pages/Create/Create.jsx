import { Link, Route, Switch } from 'react-router-dom';
import Banks from '../../Components/Banks';
import Branches from '../../Components/Branches';
import Buildings from '../../Components/Buildings';
import Companys from '../../Components/Companys';
import useAuth from '../../Hooks/useAuth';
import './Create.scss'

function Create() {
    const [setToken] = useAuth(false)
    return (
        <>
            <div className="create_wrapper">
            <Link to='/admin/signup' className="log_out add_admin">Add Admin</Link>
            <button className="log_out" onClick={() => setToken(false)} >Log Out</button>
            <div className="create_header">
                <Link className='create_link' to='/admin/create/'>
                    1.Buildings
                    <div />
                </Link>
                <Link className='create_link' to='/admin/create/branches'>
                    2.Branches
                    <div />
                </Link>
                <Link className='create_link' to='/admin/create/company'>
                    3.Companys
                    <div />
                </Link>
                <Link className='create_link' to='/admin/create/banks'>
                    4.Banks
                    <div />
                </Link>
            </div>
            <Switch>
                <Route component={Buildings} path='/admin/create/' exact />
                <Route component={Branches} path='/admin/create/branches' />
                <Route component={Companys} path='/admin/create/company' /> 
                <Route component={Banks} path='/admin/create/banks' />
            </Switch>
            </div>
        </>
    )
}

export default Create;
