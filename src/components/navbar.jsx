import React from 'react'
import { NavLink } from 'react-router-dom'

const navbar = () => {
  return (
    <div className='glass-nav'>
      <div className='brand-chip'>Notes</div>
      <div className='nav-links'>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          HOME
        </NavLink>
        <NavLink to="/paste" className={({ isActive }) => (isActive ? 'active' : '')}>
          PASTE
        </NavLink>
      </div>
    </div>
  )
}

export default navbar