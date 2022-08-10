import React, { useState } from 'react'
import { useEffect } from 'react'
import request from '../api';
import './Single.css'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editAddressById, getAddressById } from '../Redux/Actions';
import EditAddress from './EditAddress';

export default function SingleAddress() {
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getAddressById(id))
    }, [id])

    const { address } = useSelector(state => state.addressById)
    const [editJobSite, setEditJobSite] = useState(false)




    const [number, setNumber] = useState('')
    const [item, setItem] = useState('')
    const [Quantity, setQuantity] = useState('')
    const [Description, setDescription] = useState('')
    const [Notes, setNotes] = useState('')


    let newArray = address?.items?.filter(() => [...address.items]).sort((a, b) => a.number - b.number)
    address?.items?.sort((a, b) => a.number - b.number)
    function editAddress(item, number, quantity, description, notes) {
        address.items?.filter((i, index) => {
            if (i.number === number) {
                setEditJobSite(true)
                setItem(item)
                setNumber(number)
                setQuantity(quantity)
                setDescription(description)
                setNotes(notes)
                console.log(index);
            }
        })
    }

    newArray = address?.items?.filter((element, i) => {
        const isDuplicate = newArray.includes(element.number);
        if (!isDuplicate) {
            newArray.push(element.number);
            return true;
        }
    })

    return (
        <div className='inventory_grid'>
            {editJobSite && <EditAddress
                newArray={newArray}
                id={id}
                address={address}
                setItem={setItem}
                setDescription={setDescription}
                setQuantity={setQuantity}
                setNotes={setNotes}
                number={number}
                setEditJobSite={setEditJobSite} />}
            <div className='left-section'>
                <div className="title">
                    {address.name}
                </div>
                <div className="categories">
                    {
                        address.categories?.map((ad, i) => {
                            return (
                                <span key={i}>{ad}</span>
                            )
                        })
                    }
                </div>
            </div>
            <div className='right-section'>
                <div className="data-grid">
                    DATA GRID
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Nr.</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Notes</th>
                        </tr>
                        {
                            newArray?.map(item => {
                                return (
                                    <tr className='tr_notes' onDoubleClick={() => editAddress(item.item, item.number, item.Quantity, item.Description, item.notes)} key={item.number}>
                                        <td>{item.number}</td>
                                        <td>{item.item}</td>
                                        <td>{item.Quantity}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.notes}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
