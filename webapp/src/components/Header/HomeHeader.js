import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

class HomeHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchInput: ''
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOnKeyPress = (e) => {
    if (!e) e = window.event
    let keyCode = e.keyCode || e.which
    if (keyCode == '13') {
      this.props.search( this.state.searchInput )
      return false
    }
  }

  render () {
    let { search, clearSearch } = this.props
    let { searchInput } = this.state

    return (
      <nav className="navbar navbar-fixed-top navbar-home">
        <div className="navbar-header">
          <Link className="navbar-brand" onClick={clearSearch}>
            Onerent
          </Link>
        </div>
        <div className="navbar-access">
          <input name="searchInput"
            type="text" 
            placeholder="Enter a name of a user or property" 
            onChange={this.handleOnChange} 
            onKeyPress={this.handleOnKeyPress}
            value={searchInput}
            className="form form-control" />     
          <button className="btn btn-primary" onClick={() => search(searchInput)}>
            <span className="glyphicon glyphicon-search" />&nbsp;Search
          </button>
        </div>
      </nav>
    )
  }
}

export default HomeHeader
