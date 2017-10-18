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
        // Fetch users by search string
        let usersPromise = Db.models.user.findAll({ 
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.iLike]: `%${args.searchString}%`
                }
              },
              {
                lastName: {
                  [Op.iLike]: `%${args.searchString}%`
                }
              }
            ]
          } 
        })

        // Fetch properties by search string
        let propsPromise = Db.models.property.findAll({ 
          where: {
            [Op.or]: [
              {
                street: {
                  [Op.iLike]: `%${args.searchString}%`
                }
              },
              {
                city: {
                  [Op.iLike]: `%${args.searchString}%`
                }
              },
              {
                state: {
                  [Op.iLike]: `%${args.searchString}%`
                }
              },
            ]
          } 
        })
          
        // Return users and properties in one object
        return Promise.join(
          usersPromise,
          propsPromise,
          (users, properties) => {
            return { users, properties }
          }
        ) 
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: MainQuery
})