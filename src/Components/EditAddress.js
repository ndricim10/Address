import React, { useState } from 'react'
import { useEffect } from 'react'
import './edit.css'
import { useDispatch, useSelector } from 'react-redux';
import {  editAddress, getAddressById } from '../Redux/Actions';
import request from '../api';

export default function EditAddress({ setEditJobSite, number, address, id, newArray }) {
    const dispatch = useDispatch()
    const adr = address.items?.filter(i => {
        return i.number === number
    })


    const [item, setItem] = useState(adr[0].item)
    const [num, setnum] = useState(adr[0].number)
    const [quantity, setQuantity] = useState(adr[0].Quantity)
    const [Description, setDescription] = useState(adr[0].Description)
    const [notes, setNotes] = useState(adr[0].notes)

    const handleSubmit = (e) =>  {
        e.preventDefault()
        setEditJobSite(false)
        
        const obj = {
            name: address.name,
            status: address.status,
            items: [
                {
              item: item,
              Quantity: quantity,
              Description: Description,
              notes: notes,
              number: num
            },
            ...address.items],
            categories: address.categories
          }

          request.put(`/Address/${id}`, obj);
        
          setTimeout(() => {
            dispatch(getAddressById(id))
          }, 1)
        
    }

    

    function handleCancel(e) {
        e.preventDefault()
        setEditJobSite(false)
    }

    return (
        <div className='edit_address'>
            <div className='edit_row'>Edit Row 1</div>
            <form action="" onSubmit={handleSubmit}>
                <div className="items_flex">
                    <div className="item">
                        <span>Item</span>
                        <input type="text" placeholder='Set item...' onChange={(e) => setItem(e.target.value)} value={item} />
                    </div>
                    <div className="item">
                        <span>Quantity</span>
                        <input type="text" placeholder='Set quantity...' onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                    </div>
                </div>
                <div className="item">
                    <span>Description</span>
                    <textarea rows={10} placeholder="Type the description..." onChange={(e) => setDescription(e.target.value)} value={Description}></textarea>
                </div>
                <div className="item">
                    <span>Notes</span>
                    <textarea rows={10} placeholder="Type a note..." onChange={(e) => setNotes(e.target.value)} value={notes}></textarea>
                </div>

                <div className="buttons">
                    <button onClick={handleCancel} >Cancel</button>
                    <button onClick={handleSubmit} className='save' >Save</button>
                </div>
            </form>
        </div>
    )
}
