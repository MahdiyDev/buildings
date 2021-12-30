import { Button, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import url from "../assets/url"
import useAuth from "../Hooks/useAuth"
import Message from "./Message/Message"

function Companys() {
    const { register, handleSubmit } = useForm()
    const [ message, setMessage ] = useState('')
    const [ branches, setBranches ] = useState([])
    const [ value, setValue ] = useState('')
    const [token] = useAuth(true)
    useEffect(() => {
        fetch(`${url}/branches`)
            .then(res => res.json())
            .then(data => setBranches(data))
            .catch(err => console.log(err))
    }, [])

    const onSubmit = async (data) => {
        const newFormData = new FormData()
        newFormData.append('file', data.file[0])
        newFormData.append('company_name', data.company_name)
        newFormData.append('company_info', data.company_info)
        newFormData.append('branches', value)
        try {
            const res = axios.post(`${url}/companys`, newFormData, {
                headers: {
                    auth: token
                },
                'Content-Type': 'multipart/form-data'
            })
            const { data } = await res
            setMessage(await data.statusText)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="_wrapper">     
        <h1>Create Companys</h1>       
            <form className="_wrapper_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="file_input_wrapper">
                    <input required className='file_input' type='file' {...register('file')} />
                </div>
                <div className='input_wrapper'>
                    <TextField
                    required
                    label="Company Name"
                    id="outlined-size-small"
                    size="small"
                    {...register('company_name')}
                    />
                    <TextareaAutosize
                    required
                    aria-label="empty textarea"
                    placeholder="Company Info..."
                    style={{ height: 100 }}
                    {...register('company_info')}
                    />
                    {branches.length ?
                        <Select onChange={e => setValue(e.target.value)}>
                            {branches.map(b => {
                                return (
                                    <MenuItem
                                    value={JSON.stringify([{ branch_uid: b.branch_uid }])}
                                    key={b.branch_uid}
                                    >
                                        {b.branch_name} ({b.branch_region})
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    : ''}
                    <Button color='primary' variant="contained" type="submit">Submit</Button>
                </div>
            </form>
            <Message message={message} />
        </div>
        </>
    )
}

export default Companys;