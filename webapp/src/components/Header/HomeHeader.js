import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const HomeHeader = () => (
  <nav className="navbar navbar-fixed-top navbar-home">
    <div className="navbar-header">
      <Link to="/" className="navbar-brand">
        Onerent
      </Link>
    </div>
  </nav>
)

export default HomeHeader
