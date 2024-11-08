'use client'
import React from 'react';
import NavLinks from '@/app/ui/nav-links';

export default function TopMenu() {
    const [isActive, setisActive] = React.useState(false)
    return (
        <nav className='navbar is-fixed-top is-spaced' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <a
                    onClick={() => {
                        setisActive(!isActive)
                    }}
                    role='button'
                    className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                    aria-label='menu'
                    aria-expanded='false'
                    data-target='navbar'
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
            </div>
            <div id='navbar' className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className='navbar-item'>
                    <NavLinks />
                </div>
            </div>
        </nav>
    )
}