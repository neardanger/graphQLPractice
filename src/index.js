import { GraphQLServer } from "graphql-yoga";
import { getPackedSettings } from "http2";

//Type definitions

//example
const typeDefs = `

type Query {
   id: ID!
   firstname: String!,
   lastname: String!,
   age: Int!,
   gpa: Float!
}

`;
//Resolvers

const resolvers = {
  Query: {
    firstname() {
      return "This is where your first name would go";
    },
    lastname() {
      return "Your last name would go here";
    },
    age() {
      return 17;
    },
    gpa() {
      return 3.1;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

console.log("Testing server");

server.start(() => {
  console.log("The server has started");
});
