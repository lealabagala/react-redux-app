import React from 'react'
import classes from './HomeView.scss'
import { Button } from 'react-bootstrap'

class HomeView extends React.Component {
  componentWillMount () {
    this.props.connectToAPI()
    this.props.search('Pine')
  }

  render () {
    let { app } = this.props

    app = app.toJSON()
    console.log(app)
    return (
      <div>
        <h4 className="home-title">Welcome, Guest!</h4>
        <h6>This is a sample React-Redux app with a login and logout function.</h6>
      </div>
    )
  }
}

export default HomeView
