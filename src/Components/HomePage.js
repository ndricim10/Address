import React from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAddress } from '../Redux/Actions'
import AddJobSite from './AddJobSite'
import { useState } from 'react'
import {useParams, Link} from 'react-router-dom'

export default function HomePage() {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(getAddress())
    }, [dispatch])
    const { address } = useSelector(state => state.address)
    const [addJobSite, setAddJobSite] = useState(false)

    const bg_color = (ad) => {
        if (ad.status === 'on hold') {
            return 'on_hold'
        }
        else if (ad.status === 'in progress') {
            return 'in_progress'
        }
        else {
            return 'completed'
        }
    }

   


    return (
        <div className='home_page'>
            <div className="sites">
                <div className="sites_content">
                    <span className='sitename'>job site name</span>
                    <span className='status'>Status</span>

                </div>
                <div className="all_sites">
                    {
                        address.map(ad => {
                            return (
                                <>
                                    <div className="sites_content" key={ad.id}>
                                        <Link to={`/address/${ad.id}`} className='a'>
                                        <span className='address_name'>{ad.name}</span>
                                        </Link>
                                        <div className={bg_color(ad) + ' status'} >
                                            <span >{ad.status}</span>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    }

                </div>

            </div>
            <div className='create_btn'>
                <span className='btn' onClick={()=>setAddJobSite(true)}>Create</span>
            </div>
            {addJobSite && <AddJobSite setAddJobSite={setAddJobSite} address={address} />}
            
        </div>
    )
}
