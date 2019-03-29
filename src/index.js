import { GraphQLServer, PubSub } from "graphql-yoga";
import AddArgumentsAsVariablesTransform from "graphql-tools/dist/transforms/AddArgumentsAsVariables";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const pubsub = new PubSub();

//Type definitions
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("The server has started on localport 4000");
});
