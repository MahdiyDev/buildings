import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import url from '../../assets/url';
import Message from '../../Components/Message/Message'
import './BuyBuilding.scss'

function BuyBuilding({ buyModal }) {
    const { register, handleSubmit } = useForm()
    const [ bank, setBank ] = useState([])
    const [ value, setValue ] = useState([])
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        const itemStorage = window.localStorage.getItem('buy')
        const item = itemStorage ? JSON.parse(itemStorage) : null
        if (item) {
            fetch(`${url}/banks/${item.price}`)
            .then(res => res.json())
            .then(data => setBank(data))
            .catch(err => console.log(err))
        }
    }, [window.localStorage.getItem('buy')])

    const buySubmit = data => {
        const itemStorage = window.localStorage.getItem('buy')
        const item = itemStorage ? JSON.parse(itemStorage) : null
        let buyItem = {
            cart_email: data.cart_email,
            buildings: [
                { building_uid: item.building }
            ],
            branch: {
                branch_uid: item.branch
            },
            cart_bank: {
                bank_uid: value
            }
        }
        fetch(`${url}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(buyItem)
        })
        .then(res => res.json())
        .then(data => {
            data.statusText ? setMessage(data.statusText) : console.log(data)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        {buyModal ?
            <div className="container">
                <div id='buybuilding' className="about_wrapper">
                    {bank.length ?
                       <form className='buy_from' onSubmit={handleSubmit(buySubmit)}>
                        <TextField
                        {...register('cart_email')}
                        placeholder='Email' 
                        label="Email" 
                        type='email' 
                        color="primary" 
                        required
                        />
                            <Select
                                required
                                onChange={e => setValue(e.target.value)}
                            >
                                {bank.map(e => {
                                    return (
                                        <MenuItem key={e.bank_uid} value={e.bank_uid}>
                                            {e.bank_name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                            <Button variant='contained' type="submit">Buy</Button>
                       </form>
                    : <h3>Banks Not Available</h3>}
                </div>
            </div>
        : ''}
        <Message message={message} />
        </>
    )
}

export default BuyBuilding;
