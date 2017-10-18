import React from 'react'

export const PropertiesList = ({ properties, formatAmount }) => (
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
        <div className="col-md-2">{ formatAmount(property.rent) }</div>
        <div className="col-md-2">{ property.user.firstName } { property.user.lastName }</div>
      </div>
    )) }
  </div>
)