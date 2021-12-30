import { Button, TextareaAutosize, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import url from '../assets/url'
import Message from "./Message/Message";
import useAuth from '../Hooks/useAuth'

function Buildings() {
    const { register, handleSubmit } = useForm()
    const [ message, setMessage ] = useState('')
    const [token] = useAuth(true)

    const onSubmit = async (data) => {
        const newFormData = new FormData()
        newFormData.append('file', data.file[0])
        newFormData.append('building_room_count', parseInt(data.building_room_count))
        newFormData.append('building_info', data.building_info)
        newFormData.append('building_home_num', data.building_home_num)
        newFormData.append('building_price', parseInt(data.building_price))
        try {
            const res = axios.post(`${url}/buildings`, newFormData, {
                headers: {
                    auth: token
                },
                'Content-Type': 'multipart/form-data',
                auth: token
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
        <h1>Create Buildings</h1>       
            <form className="_wrapper_form _wrapper_form_building" onSubmit={handleSubmit(onSubmit)}>
                <div className="file_input_wrapper">
                    <input required className='file_input' type='file' {...register('file')} />
                </div>
                <div className='input_wrapper'>
                    <TextField
                    required
                    label="Home Num"
                    id="outlined-size-small"
                    size="small"
                    {...register('building_home_num')}
                    />
                    <TextField
                    required
                    label="Room Count"
                    id="outlined-size-small"
                    size="small"
                    {...register('building_room_count')}
                    />
                    <TextField
                    required
                    label="Building Price"
                    id="outlined-size-small"
                    size="small"
                    {...register('building_price')}
                    />
                    <TextareaAutosize
                    required
                    aria-label="empty textarea"
                    placeholder="Enter Description..."
                    style={{ height: 100 }}
                    {...register('building_info')}
                    />
                    <Button color='primary' variant="contained" type="submit">Submit</Button>
                </div>
            </form>
            <Message message={message} />
        </div>
        </>
    )
}

export default Buildings;