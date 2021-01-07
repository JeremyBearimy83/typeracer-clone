import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

const RootQueryType = new GraphQLObjectType({
  name: "Root Query",
  fields: {},
});

const RootMutationType = new GraphQLObjectType({
  name: "Root Mutation",
  fields: {},
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
