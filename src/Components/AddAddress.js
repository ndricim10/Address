import React, { useState } from 'react'
import { useEffect } from 'react'
import './edit.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAddressById } from '../Redux/Actions';
import request from '../api';
import { Modal, Box } from '@material-ui/core';

export default function AddAddress({ setAddJobSite, number, address, id, addJobSite }) {
    const dispatch = useDispatch()
   

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [item, setItem] = useState('')
    const [num, setnum] = useState('')
    const [quantity, setQuantity] = useState('')
    const [Description, setDescription] = useState('')
    const [notes, setNotes] = useState('')

    const existNumber = address.items?.map(item=>item.number)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(item.length===0 || num.length===0 ){
            alert('you must put a number or a value')
        }
        if(address.items?.includes(existNumber)){
            alert('This number already exists')
            return null
        }
        else{
            setAddJobSite(false)
        console.log(address.items?.includes(parseInt(existNumber)), "eN:", existNumber)

        const obj = {
            name: address.name,
            status: address.status,
            items: [
                {
                    item: item,
                    Quantity: quantity,
                    Description: Description,
                    notes: notes,
                    number: parseInt(num)
                },
                ...address.items],
            categories: address.categories
        }
        request.put(`/Address/${id}`, obj);

        setTimeout(() => {
            dispatch(getAddressById(id))
        }, 1)
        }
        getAddressById(id)
    }


    function handleCancel(e) {
        e.preventDefault()
        setAddJobSite(false)
    }

    return (

        <Modal 
        open={addJobSite}
        onClose={()=>setAddJobSite(false)}
        >
            <div className='edit_address' style={style}>
                <div className='edit_row'>Add a row </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="items_flex">
                    <div className="item">
                            <span>Number</span>
                            <input type="text" placeholder='Set number...' onChange={(e) => setnum(e.target.value)} />
                        </div>
                        <div className="item">
                            <span>Item</span>
                            <input type="text" placeholder='Set item...' onChange={(e) => setItem(e.target.value)}  />
                        </div>
                        <div className="item">
                            <span>Quantity</span>
                            <input type="text" placeholder='Set quantity...' onChange={(e) => setQuantity(e.target.value)}  />
                        </div>
                    </div>
                    <div className="item">
                        <span>Description</span>
                        <textarea rows={10} placeholder="Type the description..." onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </div>
                    <div className="item">
                        <span>Notes</span>
                        <textarea rows={10} placeholder="Type a note..." onChange={(e) => setNotes(e.target.value)} ></textarea>
                    </div>

                    <div className="buttons">
                        <button onClick={handleCancel} >Cancel</button>
                        <button onClick={handleSubmit} className='save' >Create</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
