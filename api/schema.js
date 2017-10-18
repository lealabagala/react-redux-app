const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

const Db = require('./db')
const Sequelize = require('sequelize')

const Op = Sequelize.Op
const Promise = require('bluebird')
const _ = require('lodash')

// User Object Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve (user) {
        return user.getProperties()
      }
    }
  })
})

// Property Object Type
const PropertyType = new GraphQLObjectType({
  name: 'Property',
  fields: () => ({
    id: { type:GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    rent: { type: GraphQLFloat },
    user: {
      type: UserType,
      resolve (property) {
        return property.getUser()
      }
    }
  })
})

// Query Object Type
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: (x) => ({
    users: { 
      type: new GraphQLList(UserType),
      resolve(queryObject) {
        return queryObject.users
      }
    },
    properties: { 
      type: new GraphQLList(PropertyType),
      resolve(queryObject) {
        return queryObject.properties
      }
    },
    searchStrings: {
      type: new GraphQLList(GraphQLString),
      resolve(queryObject) {
        return queryObject.searchStrings
      }
    }
  })
})

// Main Query
const MainQuery = new GraphQLObjectType({
  name: 'MainQuery',
  fields: {
    search: {
      type: QueryType,
      args: {
        searchString: { type: GraphQLString }
      },
      resolve(root, args) {
        let { searchString } = args
        let searchStrings = searchString.split(' ')  // split search string by space character

        if (searchStrings.length > 1) {
          searchStrings = searchStrings.filter((str) => { return str !== '' }) // filter empty strings
        }
        
        let userFields = ['firstName', 'lastName']        // search user's first and last name
        let propertyFields = ['street', 'city', 'state']  // search properties' street, city, and state
        let userConditions = []
        let propertyConditions = []

        // set conditions for searching string
        _.times(searchStrings.length, (i) => {
          let params = []
          _.times(userFields.length, (j) => {
            params.push({
              [userFields[j]]: {
                [Op.iLike]: `%${searchStrings[i]}%`
              }
            })
          })
          userConditions.push({
            [Op.or]: params
          })

          params = []
          _.times(propertyFields.length, (j) => {
            params.push({
              [propertyFields[j]]: {
                [Op.iLike]: `%${searchStrings[i]}%`
              }
            })
          })
          propertyConditions.push({
            [Op.or]: params
          })
        })
        
      
        // Fetch users by search string
        let usersPromise = Db.models.user.findAll({ 
          where: {
            [Op.and]: userConditions
          } 
        })

        // Fetch properties by search string
        let propsPromise = Db.models.property.findAll({ 
          where: {
            [Op.and]: propertyConditions
          } 
        })
          
        // Return users and properties in one object
        return Promise.join(
          usersPromise,
          propsPromise,
          (users, properties) => {
            return { users, properties, searchStrings }
          }
        ) 
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: MainQuery
})