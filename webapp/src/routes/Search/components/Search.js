import React from 'react'
import classes from './Search.scss'
import { Button } from 'react-bootstrap'
import accounting from 'accounting'
import { UserList } from './subcomponents/UserList'
import { PropertiesList } from './subcomponents/PropertiesList'

class Home extends React.Component {

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  formatAmount = (amount, currency='$') => {
    return accounting.formatMoney(amount, { symbol: currency, format: '%s %v' });
  }

  render () {
    let { searchResult } = this.props
    let { users, properties, searchStrings } = searchResult.toJSON()
    let showUsers = users.length !== 0
    let showProperties = properties.length !== 0
    
    let Header = searchStrings.length === 0 ? 
      <div className="text-center margin-top-40">
        <h4 className="home-title">Welcome, Guest!</h4>
        <h6>This is a sample React-Redux app with a search function.</h6>
      </div> :
      searchStrings[0] === '' ?
        <center><h3>All Results</h3></center> :
        <center><h3>
          { !showUsers && !showProperties ? 'No ' : '' } 
          Search Results for { searchStrings.map(str => `"${str}" `) }</h3></center>

    return (
      <div className="container container-results text-left">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            { Header }
            { showUsers && <h4>Users</h4> }
            { showUsers && <UserList {...{ users, formatAmount: this.formatAmount }} /> }
            <br/>
            { showProperties && <h4>Properties</h4> }
            { showProperties && <PropertiesList {...{ properties, formatAmount: this.formatAmount }} /> }
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    )
  }
}

export default Home
