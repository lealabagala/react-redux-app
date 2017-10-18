const Sequelize = require('sequelize')
const _ = require('lodash')
const data = require('./data.json')

// DB connection (change if necessary)
const DB_NAME = 'onerent'
const DB_USER = 'LeaMarie'
const DB_PASSWORD = null

// Establish connection to database
const Conn = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    dialect: 'postgres',
    host: 'localhost'
  }
)

// Users table
const User = Conn.define('user', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

// Properties table
const Property = Conn.define('property', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  street: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rent: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

// Table Relations
User.hasMany(Property)
Property.belongsTo(User)

// Initialization of db data
Conn.sync({ force: true }).then(()=> {
  _.times(data.users.length, (i) => {
    return User.create({
      id: data.users[i].id,
      firstName: data.users[i].firstName,
      lastName: data.users[i].lastName,
    }).then(user => {
      let properties = data.users[i].properties
      let pLength = data.users[i].properties.length
    
      _.times(pLength, (i) => {
        return user.createProperty(properties[i])
      })
    })
  })
})

module.exports = Conn
