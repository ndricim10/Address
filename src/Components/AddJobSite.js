import React from 'react'
import './jobsite.css'
import { AiFillCaretDown } from 'react-icons/ai'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addAddress } from '../Redux/Actions';
import { Modal, Box } from '@material-ui/core';

export default function AddJobSite({ address, setAddJobSite }) {
    const dispatch = useDispatch()
    const myStatus = address.map((adr) => {
        return adr.status;
    });

    const style = {
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [status, setStatus] = useState('completed')
    const [openStatus, setOpenStatus] = useState(false)
    const uniqueStatus = [...new Set(myStatus)];
    const [categoryInclude, setCategoryInclude] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [name, setName] = useState('')

    const categories = ['Shed', 'Scaffold', 'Stair Tower', 'Manhatan', 'LA', 'Shoring', 'Random', 'Other']



    function handleStatus(s) {
        setStatus(s)
        setOpenStatus(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(addAddress(name, categoryInclude, status))
        setAddJobSite(false)
    }

    function handleCancel(e) {
        e.preventDefault()
        setAddJobSite(false)
    }

    function pushCategory(category) {
        setCategoryInclude(prev => [...prev, category])
    }

    const filterCategories = categories.filter(category => {
        return (
            category.toLocaleLowerCase().match(searchQuery.toLocaleLowerCase())
        )
    }).map(category => {
        return (
            <ul>
                <li onClick={() => pushCategory(category)}>{category}</li>
            </ul>
        )
    })

    const uniqueCategories = [...new Set(categoryInclude)];


    return (
        <Modal
        open={()=>setAddJobSite(true)}
        onClose={()=>setAddJobSite(false)}>
            <div className='jobsite' style={style}>
            <div className="jobsite_title">
                ADD NEW JOB SITE
            </div>
            <form onSubmit={handleSubmit}>
                <div className="name">
                    <span>Name</span>
                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Start typing to project name' />
                </div>
                <div className="categories">
                    <div className="name">
                        <span>Category included</span>
                        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                        <div className='categories_selected'> {uniqueCategories.map((c, i) => {
                            return(
                                <span key={i}>{c}</span>
                            )
                        })}</div>
                        {filterCategories}
                    </div>
                    <div className="name">
                        <span>Status</span>
                        <div className="dropdown">
                            <span>{status}</span>
                            <AiFillCaretDown size={25} onClick={() => setOpenStatus(true)} />
                            {openStatus && <div className="categories_absolute">
                                {
                                    uniqueStatus.map((status, i) => {
                                        return (
                                            <span onClick={() => handleStatus(status)} key={i}>{status}</span>
                                        )
                                    })
                                }
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit} className='save' >Save</button>
                </div>
            </form>
        </div>
        </Modal>
    )
}
