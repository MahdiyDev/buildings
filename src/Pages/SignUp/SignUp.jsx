import { Button, TextField } from "@mui/material";
import Message from "../../Components/Message/Message";
import useSignUp from "../../Hooks/useSignUp";

function SignUp() {
    const [setAdmin, message] = useSignUp()
    const hanleSubmit = e => {
        e.preventDefault()
        const inputs = document.querySelectorAll('input')
        const admin = {
            admin_email: inputs[0].value,
            admin_password: inputs[1].value
        }
        setAdmin(admin)
    }

    return (
        <>
            <div className='form_wrapper'>
                <form className='form' onSubmit={hanleSubmit} >
                <h1>Sign Up</h1>
                    <TextField placeholder='Email' label="Email" type='email' color="primary" />
                    <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
                    <Button type="submit" variant="contained">Submit</Button>
                </form>
            </div>
            <Message message={message} />
        </>
    )
}

export default SignUp;
