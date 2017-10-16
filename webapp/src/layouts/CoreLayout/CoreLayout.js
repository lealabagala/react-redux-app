import React from 'react'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import HeaderContainer from 'containers/HeaderContainer'

export const CoreLayout = (props) => {
  return (
    <div className="container text-center">
      <HeaderContainer {...props}/>
      <div className={`row ${classes.mainContainer}`}>
        {props.children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
