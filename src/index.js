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
  },
  {
    id: "4",
    name: "Lucas",
    email: "lucas.magadan@hotmail.com"
  }
];

const posts = [
  {
    id: "1",
    title: "A generic post",
    body: "This is just a generic post to show people reading the blog",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "A new dawn",
    body: "dawn comes after darkness",
    published: false,
    author: "2"
  },
  {
    id: "3",
    title: "awesome post",
    body: "this is an awesome post",
    published: true,
    author: "3"
  }
];

const comments = [
  {
    id: "1",
    title: "dirk sucks",
    body:
      "Rest is going to be obsolete pretty soon its just a matter of time before graphql gains massive adaptation",
    author: "1"
  },
  {
    id: "2",
    title: "dirk caber",
    body: "He is the best actor in the current day and age",
    author: "2"
  },
  {
    id: "3",
    title: "will braun",
    body: "Another popular actor in the website that showcases things",
    author: "3"
  },
  {
    id: "4",
    title: "Jason Mason",
    body: "This is a dummy comment",
    author: "4"
  }
];

//Parenthesis (parent, args, ctx, info)
const typeDefs = `
  type Query {
    users(query:String): [User!]!
    posts(query:String): [Post!]!
    comments(query:String):[Comment!]!
    me: User!
    post: Post!
    }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments:[Comment!]!
}

  type Post {
    id: ID!,
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }


  type Comment {
    id: ID!
    title: String!
    body: String!
    author: User!
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
        const userMatch = user.name
          .toLowerCase()
          .includes(args.query.toLowerCase());

        return userMatch;
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
    },

    comments(parent, args, info, ctx) {
      if (!args.query) {
        return comments;
      }
      return comments.filter(comment => {
        const commentTitle = comment.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const bodyTitle = comment.title
          .toLowerCase()
          .includes(args.query.toLowerCase());

        return commentTitle || bodyTitle;
      });
    }
  },
  Post: {
    author(parent, args, info, ctx) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent,args,info,ctx) {
      return comments.finder(comment => {
        
      })
    }
  },
  User: {
    posts(parent, args, info, ctx) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, info, ctx) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, info, ctx) {
      return comments.filter(comment => {
        return comment.id === parent.author;
      });
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

// connector trying jawline kung embroider spoiler
