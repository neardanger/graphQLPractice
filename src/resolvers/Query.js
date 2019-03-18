const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter(user => {
      const userMatch = user.name
        .toLowerCase()
        .includes(args.query.toLowerCase());

      return userMatch;
    });
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post => {
      const titleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const bodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());

      return titleMatch || bodyMatch;
    });
  },

  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments;
    }
    const titleSort = db.comments.filter(comment => {
      comment.toLowerCase().includes(args.query.toLowerCase());
    });
    const bodySort = db.comments.filter(comment => {
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
