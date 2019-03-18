import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, info, ctx) {
    const userTaken = users.some(user => user.email === args.data.email);
    if (userTaken) {
      throw new Error("This username is taken");
    }
    const user = {
      id: uuidv4(),
      ...args.data
    };
    users.push(user);
    return user;
  },

  createPost(parent, args, info, ctx) {
    const userExists = users.some(user => user.id === args.data.author);
    if (!userExists) {
      throw new Error("This user does not exist.");
    }
    const post = {
      id: uuidv4(),
      ...args.data
    };
    posts.push(post);

    return post;
  },
  createComment(parent, args, info, ctx) {
    const userExists = users.some(user => user.id === args.data.author);
    const postExists = posts.some(
      post => post.id === args.data.post && post.published
    );

    if (!userExists || !postExists) {
      throw new Error("This user does not exist along with the post");
    }
    const comment = {
      id: uuidv4(),
      ...args.data
    };
    comments.push(comment);

    return comment;
  },

  deleteUser(parent, args, info, ctx) {
    const findUser = users.findIndex(user => args.id === user.id);
    if (findUser === -1) {
      throw new Error("That user was not found in the database.");
    }
    const deleteUser = users.splice(findUser, 1);

    posts = posts.filter(post => {
      const match = post.author === args.id;

      if (match) {
        comments = comments.filter(comment => comment.post !== post.id);
      }

      return !match;
    });
    comments = comments.filter(comment => comment.author !== args.id);

    return deleteUser[0];
  }
};

export { Mutation as default };
