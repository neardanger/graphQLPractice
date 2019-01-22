import { GraphQLServer } from "graphql-yoga";

//Type definitions

const typeDefs = `

type Query {
   name: String!,
   lastname: String!,
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
