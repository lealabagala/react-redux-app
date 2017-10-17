import React from 'react'
import classes from './Search.scss'
import { Button } from 'react-bootstrap'

class Home extends React.Component {

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    let { searchResult, searchString } = this.props
    let { users, properties } = searchResult.toJSON()
    let showUsers = users.length !== 0
    let showProperties = properties.length !== 0
    
    return (
      <div className="container container-results text-left">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            { searchString === '' ? 
              !showUsers && !showProperties ?
                <div>
                  <h4 className="home-title">Welcome, Guest!</h4>
                  <h6>This is a sample React-Redux app with a search function.</h6>
                </div> : 
                <center><h3>All Results</h3></center> :
                <center><h3>Search Results for "{ searchString }"</h3></center> }
            { showUsers && <h4>Users</h4> }
            { showUsers &&
              <div className="panel panel-main">
                <div className="row row-labels">
                  <div className="col-md-2"><b>First Name</b></div>
                  <div className="col-md-2"><b>Last Name</b></div>
                  <div className="col-md-2"><b>Properties</b></div>
                  <div className="col-md-6"></div>
                </div>
                <br/>
                { users.map((user, i) => (
                  <div>
                    <div className={`row row-results ${i === 0 && 'first'} ${i === users.length-1 && 'last'}`}>
                      <div className="col-md-2">{ user.firstName }</div>
                      <div className="col-md-2">{ user.lastName }</div>
                      <div className="col-md-2">
                        { user.properties.length !== 0 ?
                          <button className="btn btn-info btn-xs" data-toggle="collapse" data-target={`#user${i}`}>
                            Show Properties
                        </button> : 'No properties'}
                      </div>
                      <div className="col-md-6"></div>
                    </div>
                    { user.properties.length !== 0 &&
                      <div className="row collapse" id={`user${i}`}>
                        <h5>Properties</h5>
                        <div className="row row-sub-labels">
                          <div className="col-md-2"></div>
                          <div className="col-md-2"><b>Street</b></div>
                          <div className="col-md-2"><b>City</b></div>
                          <div className="col-md-2"><b>State</b></div>
                          <div className="col-md-2"><b>Rent</b></div>
                          <div className="col-md-2"></div>
                        </div>
                        { user.properties.map((property, i) => (
                          <div className={`row row-sub-results ${i === 0 && 'first'} ${i === properties.length-1 && 'last'}`}>
                            <div className="col-md-2"></div>
                            <div className="col-md-2">{ property.street }</div>
                            <div className="col-md-2">{ property.city }</div>
                            <div className="col-md-2">{ property.state }</div>
                            <div className="col-md-2">{ property.rent }</div>
                            <div className="col-md-2"></div>
                          </div>
                        )) }
                      </div>
                    }
                  </div>
                )) }
              </div>
            }
            <br/>
            { showProperties && <h4>Properties</h4> }
            { showProperties &&          
              <div className="panel panel-main">
                <div className="row row-labels">
                  <div className="col-md-3"><b>Street</b></div>
                  <div className="col-md-3"><b>City</b></div>
                  <div className="col-md-2"><b>State</b></div>
                  <div className="col-md-2"><b>Rent</b></div>
                  <div className="col-md-2"><b>Owner</b></div>
                </div>
                <br/>
                { properties.map((property, i) => (
                  <div className={`row row-results ${i === 0 && 'first'} ${i === properties.length-1 && 'last'}`}>
                    <div className="col-md-3">{ property.street }</div>
                    <div className="col-md-3">{ property.city }</div>
                    <div className="col-md-2">{ property.state }</div>
                    <div className="col-md-2">{ property.rent }</div>
                    <div className="col-md-2">{ property.user.firstName } { property.user.lastName }</div>
                  </div>
                )) }
              </div>
            }
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    )
  }
}

export default Home
