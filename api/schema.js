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
        
        let oneString = false
        if (searchString.length !== 0 
            && searchString.charAt(0) === `"` 
            && searchString.charAt(searchString.length-1) === `"`) { // determine if string is closed by quotation marks
          searchStrings = [ searchString.slice(1, searchString.length-1) ]
          oneString = true
        }
        
        let userFields = ['firstName', 'lastName']        // search user's first and last name
        let propertyFields = ['street', 'city', 'state']  // search properties' street, city, and state
        let userConditions = []
        let propertyConditions = []

        // set conditions for searching string
        _.times(searchStrings.length, (i) => {
          _.times(userFields.length, (j) => {
            userConditions.push({
              [userFields[j]]: {
                [Op.iLike]: `%${searchStrings[i]}%`
              }
            })
          })
          _.times(propertyFields.length, (j) => {
            propertyConditions.push({
              [propertyFields[j]]: {
                [Op.iLike]: `%${searchStrings[i]}%`
              }
            })
          })
        })

        let userCriteria = !oneString ?
        { 
          where: {
            [Op.or]: userConditions
          } 
        } :
        {
          where: Db.where(Db.fn('concat', Db.col('firstName'), Db.col('lastName')), {
            [Op.iLike]: `%${searchStrings[0].split(' ').join('%')}%`
          })
        }

        let propCriteria = !oneString ?
        { 
          where: {
            [Op.or]: propertyConditions
          } 
        } :
        {
          where: Db.where(Db.fn('concat', Db.col('street'), Db.col('city'), Db.col('state')), {
            [Op.iLike]: `%${searchStrings[0].split(' ').join('%')}%`
          })
        }
      
        // Fetch users by search string
        let usersPromise = Db.models.user.findAll(userCriteria)

        // Fetch properties by search string
        let propsPromise = Db.models.property.findAll(propCriteria)
          
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