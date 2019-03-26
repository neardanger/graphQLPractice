import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const userTaken = db.users.some(user => user.email === args.data.email);
    if (userTaken) {
      throw new Error("This username is taken");
    }
    const user = {
      id: uuidv4(),
      ...args.data
    };
    db.users.push(user);
    return user;
  },

  createPost(parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);
    if (!userExists) {
      throw new Error("This user does not exist.");
    }
    const post = {
      id: uuidv4(),
      ...args.data
    };
    db.posts.push(post);

    return post;
  },
  createComment(parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);
    const postExists = db.posts.some(
      post => post.id === args.data.post && post.published
    );

    if (!userExists || !postExists) {
      throw new Error("This user does not exist along with the post");
    }
    const comment = {
      id: uuidv4(),
      ...args.data
    };
    db.comments.push(comment);

    return comment;
  },

  deleteUser(parent, args, { db }, info) {
    const findUser = db.users.findIndex(user => user.id === args.id);
    if (findUser === -1) {
      throw new Error("This user was not found");
    }
    const deleteUser = db.users.splice(findUser, 1);
    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;
      if (match) {
        db.comments = db.comments.filter(comment => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });
    db.comments = db.comments.filter(comment => {
      return comment.author !== args.id;
    });
    return deleteUser[0];
  },
  deletePost(parent, args, { db }, info) {
    const findPost = db.posts.findIndex(post => post.id === args.id);
    if (findPost === -1) {
      throw new Error("That post was not found");
    }
    const deletePost = db.posts.splice(findPost, 1);

    db.comments = db.comments.filter(comment => {
      return comment.post !== args.id;
    });
    return deletePost[0];
  },
  deleteComment(parent, args, { db }, info) {
    const findComment = db.comments.findIndex(
      comment => comment.id === args.id
    );
    if (findComment === -1) {
      throw new Error("That comment could not be found");
    }
    const deleteComment = db.comments.splice(findComment, 1);

    db.posts = db.posts.filter(post => {
      post.id !== args.id;
    });

    return deleteComment[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;

    const updatedUser = db.users.find(user => {
      return user.id === id;
    });
    if (!updatedUser) {
      throw new Error("That user was not found in the database.");
    }
    if (typeof data.email === "string") {
      const emailTaken = db.users.some(user => user.email === data.email);
      if (emailTaken) {
        throw new Error("That email is already taken.");
      }
      updatedUser.email = data.email;
    }
    if (typeof data.name === "string") {
      updatedUser.name = data.name;
    }
    if (typeof data.age !== "undefined") {
      updatedUser.age = data.age;
    }
    return updatedUser;
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;

    const updatedPost = db.posts.find(post => {
      return post.id === id;
    });

    if (!updatedPost) {
      throw new Error("That post does not exist in the database.");
    }
    if (typeof data.title === "string") {
      updatedPost.title = data.title;
    }
    if (typeof data.body === "string") {
      updatedPost.body = data.body;
    }
    if (typeof data.pubished === "boolean") {
      updatedPost.published = data.published;
    }
    return updatedPost;
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const updatedComment = db.comments.find(comment => comment.id === id);
    if (!updatedComment) {
      throw new Error("That comment does not exist in the database.");
    }
    if (typeof data.title === "string") {
      updatedComment.title = data.title;
    }
    if (typeof data.body === "string") {
      updatedComment.body = data.body;
    }
    return updatedComment;
  }
};

export { Mutation as default };
