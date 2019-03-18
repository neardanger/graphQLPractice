const Query = {
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

  comments(parent, args, info, ctx) {
    if (!args.query) {
      return comments;
    }
    const titleSort = comments.filter(comment => {
      comment.toLowerCase().includes(args.query.toLowerCase());
    });
    const bodySort = comments.filter(comment => {
      comment.toLowerCase().includes(args.query.toLowerCase());
    });
    return titleSort || bodySort;
  },

  me() {
    return {
      id: "1234",
      name: "Steven Magadan",
      email: "steven.magadan@hotmail.com",
      age: 18
    };
  },
  post() {
    return {
      id: "9222",
      title: "To kill a mocking bird",
      body: "This is how you kill a mocking bird",
      published: true
    };
  }
};

export { Query as default };
