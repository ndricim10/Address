import React, { useState } from 'react'
import { useEffect } from 'react'
import './Single.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAddressById } from '../Redux/Actions';
import EditAddress from './EditAddress';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { DragHandle } from './DragHandle';

export default function SingleAddress() {
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getAddressById(id))
    }, [id])

    const { address } = useSelector(state => state.addressById),
        [editJobSite, setEditJobSite] = useState(false),
        [number, setNumber] = useState(''),
        [item, setItem] = useState(''),
        [Quantity, setQuantity] = useState(''),
        [Description, setDescription] = useState(''),
        [Notes, setNotes] = useState('')


    let newArray = address?.items?.filter(() => [...address.items])
    address?.items?.sort((a, b) => a.number - b.number)
    function editAddress(item, number, quantity, description, notes) {
        newArray?.filter((i, index) => {
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
                editJobSite={editJobSite}
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
                <DragDropContext onDragEnd={(param) => {
                    const srcI = param.source.index;
                    const desI = param.destination?.index;
                    if (desI) {
                      newArray.splice(desI, 0, newArray.splice(srcI, 1)[0]);
                    //   newArray.saveList(newArray);
                    }
                }

                }>
                    <table>
                        <tbody>
                            <tr>
                                <th>Nr.</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Notes</th>
                            </tr>
                        </tbody>
                        <Droppable droppableId="droppable-1">
                            {(provided) => (
                                <tbody ref={provided.innerRef}  {...provided.droppableProps}>
                                    {
                                        newArray?.map((item, i) => {
                                            return (
                                                <Draggable key={item.number} index={i} draggableId={'draggable-' + item.number}>
                                                    {(provided, snapshot) => (
                                                        <tr ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className='tr_notes'
                                                            onDoubleClick={() => editAddress(item.item, item.number, item.Quantity, item.Description, item.notes)}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                boxShadow: snapshot.isDragging ? '0 0 .1rem #666' : null
                                                            }}
                                                        >
                                                            <td><DragHandle {...provided.dragHandleProps} />{item.number}</td>
                                                            <td>{item.item}</td>
                                                            <td>{item.Quantity}</td>
                                                            <td>{item.Description}</td>
                                                            <td>{item.notes}</td>
                                                        </tr>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </tbody>)}
                        </Droppable>

                    </table>
                </DragDropContext>
            </div>
        </div>
    )
}
