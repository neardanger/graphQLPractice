import { GraphQLServer } from "graphql-yoga";
import AddArgumentsAsVariablesTransform from "graphql-tools/dist/transforms/AddArgumentsAsVariables";

//Type definitions

//example

//demo users

const users = [
  {
    id: "1",
    name: "Steven",
    email: "steven.magadan@hotmail.com"
  },
  {
    id: "2",
    name: "Greyson",
    email: "Bennett"
  },
  {
    id: "3",
    name: "Jackson",
    email: "jackson1@gmail.com"
  }
];

const posts = [
  {
    id: "1",
    title: "A generic post",
    body: "This is just a generic post to show people reading the blog",
    published: true
  },
  {
    id: "2",
    title: "A new dawn",
    body: "dawn comes after darkness",
    published: false
  },
  {
    id: "3",
    title: "awesome post",
    body: "this is an awesome post",
    published: true
  }
];

//Parenthesis (parent, args, ctx, info)
const typeDefs = `
  type Query {
    users(query:String): [User!]!
    posts(query:String): [Post!]!
    me: User!
    post: Post!
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
    users(parent, args, info, ctx) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },

    posts(parent, args, info, ctx) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const titleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const bodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());

        return titleMatch || bodyMatch;
      });
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
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

console.log("Testing server start");

server.start(() => {
  console.log("The server has started");
});
