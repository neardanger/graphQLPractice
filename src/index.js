import { GraphQLServer } from "graphql-yoga";
import AddArgumentsAsVariablesTransform from "graphql-tools/dist/transforms/AddArgumentsAsVariables";
import uuidv4 from "uuid/v4";

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
    author: "1",
    post: "1"
  },
  {
    id: "2",
    title: "dirk caber",
    body: "He is the best actor in the current day and age",
    author: "2",
    post: "2"
  },
  {
    id: "3",
    title: "will braun",
    body: "Another popular actor in the website that showcases things",
    author: "3",
    post: "3"
  },
  {
    id: "4",
    title: "Jason Mason",
    body: "This is a dummy comment",
    author: "4",
    post: "4"
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

  type Mutation {
    createUser(name:String!, email: String!, age:Int):User!
    createPost(title:String!,body:String!,published:Boolean,author:ID!) : Post!
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
    comments: [Comment!]!
  }


  type Comment {
    id: ID!
    title: String!
    body: String!
    author: User!
    post: Post!
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

  Mutation: {
    createUser(parent, args, info, ctx) {
      const userTaken = users.some(user => user.email === args.email);
      if (userTaken) {
        throw new Error("This username is taken");
      }
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      };
      users.push(user);
      return user;
    },
    createPost(parent, args, info, ctx) {
      if (!args) {
        return posts;
      }

      const userExists = users.some(user => user.id === args.author);
      if (!userExists) {
        throw new Error("This user does not exist.");
      }
      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author
      };
      posts.push(post);

      return post;
    }
  },

  Post: {
    author(parent, args, info, ctx) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, info, ctx) {
      return comments.find(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, info, ctx) {
      return posts.find(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, info, ctx) {
      return comments.find(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, info, ctx) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, info, ctx) {
      return posts.find(post => {
        return post.id === parent.post;
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
