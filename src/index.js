import { GraphQLServer } from "graphql-yoga";
import AddArgumentsAsVariablesTransform from "graphql-tools/dist/transforms/AddArgumentsAsVariables";

//Type definitions

//example

//Parenthesis (parent, args, ctx, info)
const typeDefs = `
  type Query {
    greeting(name: String, position:String): String!
    add(numbers: [Float!]!) : Float!
    me: User!
    post: Post!
    grades: [Int!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
}

  type Post {
    id: ID!,
    title: String!,
    body: String!,
    published: Boolean!
  }

`;
//Resolvers

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      console.log(parent, args, ctx, info);
      if (args.name && args.position) {
        return `Hello, this is a greeting, ${args.name} and your position is ${
          args.position
        }`;
      }
    },
    me() {
      return {
        id: 1234,
        name: "Steven Magadan",
        email: "steven.magadan@hotmail.com",
        age: 18
      };
    },
    post() {
      return {
        id: 9222,
        title: "To kill a mocking bird",
        body: "This is how you kill a mocking bird",
        published: true
      };
    },
    add(parent, args, ctx, info) {
      if (args.length < 0) {
        return 0;
      }

      return args.numbers.reduce((accum, val) => accum + val);
    },
    grades(parent, args, ctx, info) {
      return [90, 10, 20, 80, 70, 65, 89];
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
