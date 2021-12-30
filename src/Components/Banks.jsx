import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import url from "../assets/url"
import useAuth from "../Hooks/useAuth"
import Message from "./Message/Message"

function Banks() {
    const { register, handleSubmit } = useForm()
    const [ message, setMessage ] = useState('')
    const [token] = useAuth(true)

    const onSubmit = async (data) => {
        const newFormData = new FormData()
        newFormData.append('file', data.file[0])
        newFormData.append('bank_name', data.bank_name)
        newFormData.append('bank_credit_num', parseInt(data.bank_credit_num))
        try {
            const res = await axios.post(`${url}/banks`, newFormData, {
                headers: {
                    auth: token
                },
                'Content-Type': 'multipart/form-data',
            })
            const { data } = res
            setMessage(await data.statusText)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="_wrapper">     
        <h1>Create Banks</h1>       
            <form className="_wrapper_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="file_input_wrapper">
                    <input required className='file_input' type='file' {...register('file')} />
                </div>
                <div className='input_wrapper'>
                    <TextField
                    required
                    label="Bank Name"
                    id="outlined-size-small"
                    size="small"
                    {...register('bank_name')}
                    />
                    <TextField
                    required
                    label="Bank Credit Num"
                    id="outlined-size-small"
                    size="small"
                    {...register('bank_credit_num')}
                    />
                    <Button color='primary' variant="contained" type="submit">Submit</Button>
                </div>
            </form>
            <Message message={message} />
        </div>
        </>
    )
}

export default Banks;
