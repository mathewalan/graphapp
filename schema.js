const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// Customer Type  schema
const CustomerType = new GraphQLObjectType({
  name: 'customer',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType, // above
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        // returning data
        return axios
          .get('http://localhost:3000/customers/' + args.id)
          .then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios
          .get('http://localhost:3000/customers')
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addcustomer: {
      type: CustomerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parentValue, args) {
        return axios
          .post('http://localhost:3000/customers', {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res);
      }
    },
    deletecustomer: {
      type: CustomerType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, args) {
        return axios
          .delete('http://localhost:3000/customers/' + args.id, )
          .then(res => res);
      }
    },
    updatecustomer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return axios
          .patch('http://localhost:3000/customers/' + args.id, {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});