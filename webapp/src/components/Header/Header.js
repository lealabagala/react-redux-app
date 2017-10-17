import React from 'react'
import '../../styles/core.scss'
import HomeHeader from './HomeHeader'

export const Header = (props) => {
  return (
    <header>
    <HomeHeader {...props}/>
    </header>
  )
}

Header.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Header
