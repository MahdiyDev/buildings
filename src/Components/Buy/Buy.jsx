import { useEffect, useState } from 'react';
import './Buy.scss'
import url from '../../assets/url'
import { Button } from '@mui/material'
import BuyBuilding from '../../Pages/BuyBuilding/BuyBuilding';

function Buy() {
    const [ company, setCompany ] = useState([])
    const [ branches, setBranches ] = useState(null)
    const [ modal, setModal ] = useState('modal_wrapper')
    const [ buyModal, setBuyModal ] = useState(false)
    const [ id, setId ] = useState('')

    useEffect(() => {
        fetch(`${url}/companys`)
        .then(res => res.json())
        .then(data => setCompany(data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (id) {
            fetch(`${url}/branches/${id}`)
            .then(res => res.json())
            .then(data => setBranches(data))
            .catch(err => console.log(err))
        }
    }, [id])

    const selectItem = e => {
        if (e.target.classList[0]==='company_item') {
            e.target.classList.add('company_item--active')
        }
    }

    const closeBtn = e => {
        const modalEl = document.querySelector('.company_item--active')
        if (e.target.classList[0]==='close') {
           modalEl.classList.remove('company_item--active')
        }
    }

    const buyBtn = e => {
        const modalEl = document.querySelector('.company_item--active')
        const building = e.target.dataset.id
        const branch = e.target.dataset.branch
        const price = e.target.dataset.price
        window.localStorage.setItem('buy', JSON.stringify(
            { building, branch, price }
        ))
        setBuyModal(true)
        setModal('modal_wrapper')
        modalEl.classList.remove('company_item--active')
        window.location = '#buybuilding'
    }
    return (
        <>
            <div className="container">
                <div id='buy' className="about_wrapper">
                    <h1>Buy Building</h1>
                    {company.length ?
                        <ul className='company_list'>
                            {company.map(c => {
                                return (
                                    <li className="company_item" key={c.company_uid} onClick={selectItem} >
                                        <div className="content_wrapper">
                                            <img src={`${url}/uploads/${c.company_img}`} alt={c.company_name} />
                                            <h3>{c.company_name}</h3>
                                            <p>{c.company_info}</p>
                                        </div>
                                        <div className="close" onClick={closeBtn} />
                                        {c.company_ref_branch ? 
                                        <ul className="company_branches">
                                            {c.company_ref_branch.map(b => {
                                                return (
                                                    <li 
                                                    key={b.branch_uid} 
                                                    id={b.branch_uid}
                                                    onClick={e => {
                                                        setModal('modal_wrapper--active')
                                                        setId(e.target.id)
                                                    }} className="company_branches_item" >
                                                        <img src={`${url}/uploads/${b.branch_img}`} alt={b.branch_name} />
                                                        <h4>{b.branch_name} ({b.branch_region})</h4>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        : ""}
                                    </li>
                                )
                            })}
                        </ul>
                    : ''}
                </div>
                <div className={modal} onClick={e => e.target.classList[0] === 'modal_wrapper--active' ? setModal('modal_wrapper') : ''}>
                    <div className='modal'>
                        {branches ? 
                            <div className="branches_wrapper">
                                <img src={`${url}/uploads/${branches.branch_img}`} alt={branches.branch_name} />
                                <h4>{branches.branch_name} ({branches.branch_region})</h4>
                                {branches ?
                                    <ul>
                                        {branches.branch_ref_building.map(e => {
                                            return (
                                                <li key={e.building_uid}>
                                                    <h3>{e.building_home_num}-uy</h3>
                                                    <img src={`${url}/uploads/${e.building_image}`} alt='img' />
                                                    <p>{e.building_info}</p>
                                                    <p>{e.building_room_count} xonali</p>
                                                    <strong>{e.building_price}$</strong>
                                                    <Button 
                                                        data-id={e.building_uid}
                                                        data-branch={branches.branch_uid}
                                                        data-price={e.building_price}
                                                        variant='contained' 
                                                        onClick={buyBtn}
                                                    >buy</Button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                : ''}
                            </div> 
                        :''}   
                    </div>
                </div>
            </div>
            <BuyBuilding buyModal={buyModal} />
        </>
    )
}

export default Buy;
