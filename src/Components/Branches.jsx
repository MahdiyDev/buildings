import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import url from "../assets/url"
import useAuth from "../Hooks/useAuth"
import Message from "./Message/Message"

function Branches() {
    const { register, handleSubmit } = useForm()
    const [ message, setMessage ] = useState('')
    const [ value, setValue ] = useState('')
    const [ building, setBuilding ] = useState([])
    const [ buildingValue, setBuildingValue ] = useState([])
    const [token] = useAuth(true)

    useEffect(() => {
        if (value) {
            fetch(`${url}/buildings/${value}`)
            .then(res => res.json())
            .then(data => setBuilding(data))
            .catch(err => console.log(err))
        }
    }, [value])

    const searchHome = e => {
        setValue(e.target.value)
    }

    const onSubmit = async (data) => {
        const newFormData = new FormData()
        newFormData.append('file', data.file[0])
        newFormData.append('branch_name', data.branch_name)
        newFormData.append('branch_region', data.branch_region)
        newFormData.append('buildings', buildingValue)
        try {
            const res = axios.post(`${url}/branches`, newFormData, {
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
        <h1>Create Branch</h1>
            <form className="_wrapper_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="file_input_wrapper">
                    <input required className='file_input' type='file' {...register('file')} />
                </div>
                <div className='input_wrapper'>
                    <TextField
                    required
                    label="Branch Name"
                    size="small"
                    {...register('branch_name')}
                    />
                    <TextField
                    required
                    label="Region"
                    size="small"
                    {...register('branch_region')}
                    />
                    <TextField
                    onChange={searchHome}
                    required
                    label="search home"
                    size="small"
                    />
                        {building.length ?
                            <div className="home_label_wrapper">
                            {building.map(b => {
                                return (
                                    <label htmlFor={b.building_uid} key={b.building_uid} >
                                        <input
                                            id={b.building_uid} 
                                            type="radio" 
                                            value={JSON.stringify([{ building_uid: b.building_uid }])} 
                                            name="buildings"
                                            onChange={e => setBuildingValue(e.target.value)}
                                        />
                                        {b.building_room_count} xonali
                                    </label>
                                )
                            })}
                            </div>
                        : ''}
                    <Button color='primary' variant="contained" type="submit">Submit</Button>
                </div>
            </form>
            <Message message={message} />
        </div>
        </>
    )
}

export default Branches;