import './Login.scss'
import { Button, TextField } from '@mui/material'
import useLogin from '../../Hooks/useLogin'
import Message from '../../Components/Message/Message'

function Login() {
    const [setAdmin, message] = useLogin()

    const handleSubmit = e => {
        e.preventDefault()
        const inputs = document.querySelectorAll('input')
        const admin = {
            admin_email: inputs[0].value,
            admin_password: inputs[1].value
        }
        setAdmin(admin)
    }

    return (
        <div className='form_wrapper'>
            <form className='form' onSubmit={handleSubmit} >
            <h1>Login</h1>
                <TextField placeholder='Email' label="Email" type='email' color="primary" />
                <TextField id="outlined-adornment-password" label="Password" type="password" autoComplete="current-password" />
                <Button type="submit" variant="contained">Submit</Button>
            </form>
            <Message message={message} />
        </div>
    )
}

export default Login;
