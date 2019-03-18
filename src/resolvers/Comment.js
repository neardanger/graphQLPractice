const Comment = {
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
};

export { Comment as default };
