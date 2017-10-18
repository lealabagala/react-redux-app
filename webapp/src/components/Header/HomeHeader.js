import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
import _ from 'lodash'
import { Dropdown, MenuItem } from 'react-bootstrap'

class HomeHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      showPreSearchResults: false
    }
  }

  handleOnChange = (e) => {
    this.props.search(e.target.value, 'pre')
    this.setState({ 
      [e.target.name]: e.target.value, 
      showPreSearchResults: true 
    })
  }

  handleOnKeyPress = (e) => {
    if (!e) e = window.event
    let keyCode = e.keyCode || e.which
    if (keyCode == '13') {
      this.handleSelect( this.state.searchInput )
      return false
    }
  }

  handleSelect = (str) => {
    this.props.search(str)
    this.setState({ 
      searchInput: str, 
      showPreSearchResults: false 
    })
  }

  render () {
    let { search, clearSearch, preSearchResult } = this.props
    let { searchInput, showPreSearchResults } = this.state
    let { users, properties } = preSearchResult.toJSON()

    let searchStrings = users.map(user => {
      return { value: `${user.firstName} ${user.lastName}` }
    }).concat(properties.map(property => {
      return { value: `${property.street} ${property.city} ${property.state}` }
    }))

    return (
      <nav className="navbar navbar-fixed-top navbar-home">
        <div className="navbar-header">
          <Link className="navbar-brand" onClick={clearSearch}>
            Onerent
          </Link>
        </div>
        <div className="navbar-access">
          <div className="input-grp dropdown open">
            <input name="searchInput"
              type="text" 
              placeholder="Enter a name of a user or property" 
              onChange={this.handleOnChange} 
              onKeyPress={this.handleOnKeyPress}
              value={searchInput}
              className="form form-control" />
            { searchStrings.length !== 0 && showPreSearchResults && searchStrings[0] !== "" &&
              <Dropdown.Menu className="search-result">
                { searchStrings.map((str) => (
                  <MenuItem onClick={() => this.handleSelect(`"${str.value}"`)}>{str.value}</MenuItem>
                )) }
              </Dropdown.Menu> }
          </div>
          <button className="btn btn-primary" onClick={() => this.handleSelect(searchInput)}>
            <span className="glyphicon glyphicon-search" />&nbsp;Search
          </button>
        </div>
      </nav>
    )
  }
}

export default HomeHeader
