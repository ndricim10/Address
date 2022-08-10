import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className="home_page">
            <header>
                <Link to='/' className='a'>
                    <span className='title'>inventory</span>
                </Link>
                <span className='btn'>Log out</span>
            </header>
        </div>
    )
}
