import React from 'react'

export const UserList = ({ users, formatAmount }) => (
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
              <div className="col-md-1"></div>
              <div className="col-md-3"><b>Street</b></div>
              <div className="col-md-2"><b>City</b></div>
              <div className="col-md-2"><b>State</b></div>
              <div className="col-md-3"><b>Rent</b></div>
              <div className="col-md-1"></div>
            </div>
            { user.properties.map((property, i) => (
              <div className={`row row-sub-results ${i === 0 && 'first'} ${i === user.properties.length-1 && 'last'}`}>
                <div className="col-md-1"></div>
                <div className="col-md-3">{ property.street }</div>
                <div className="col-md-2">{ property.city }</div>
                <div className="col-md-2">{ property.state }</div>
                <div className="col-md-3">{ formatAmount(property.rent) }</div>
                <div className="col-md-1"></div>
              </div>
            )) }
          </div>
        }
      </div>
    )) }
  </div>
)