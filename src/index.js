import { GraphQLServer } from "graphql-yoga";
import AddArgumentsAsVariablesTransform from "graphql-tools/dist/transforms/AddArgumentsAsVariables";
import db from "./db";
import Query from "./resolvers/Query";
import Comment from "./resolvers/Comment";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import User from "./resolvers/User";

//Type definitions
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Comment,
    Mutation,
    Post,
    User
  },
  context: {
    db
  }
});

server.start(() => {
  console.log("The server has started on localport 4000");
});
