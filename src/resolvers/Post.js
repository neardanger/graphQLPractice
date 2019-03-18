const Post = {
  author(parent, args, info, ctx) {
    return users.find(user => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, info, ctx) {
    return comments.filter(comment => {
      return comment.post === parent.id;
    });
  }
};

export { Post as default };
