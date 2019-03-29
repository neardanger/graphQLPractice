const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count: count
        });
      }, 1000);

      return pubsub.asyncIterator("count");
    }
  },
  comment: {
    subscribe(parent, { postId }, { db }, info) {
      const post = db.posts.find(post => post.id === postId && post.published);
      if (!post) {
        throw new Error("That post does not exist in the database.");
      }
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  }
};

export { Subscription as default };

//subscription js
