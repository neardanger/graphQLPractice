const User = {
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
};

export { User as default };
