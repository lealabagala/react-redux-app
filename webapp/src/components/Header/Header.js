import React from 'react'
import '../../styles/core.scss'
import HomeHeader from './HomeHeader'

export const Header = () => {
  return (
    <header>
    <HomeHeader />
    </header>
  )
}

Header.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Header
