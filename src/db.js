let users = [
  {
    id: "1",
    name: "Steven",
    email: "steven.magadan@hotmail.com"
  },
  {
    id: "2",
    name: "Greyson",
    email: "Bennett@gmail.com"
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

let posts = [
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

let comments = [
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

const db = {
  users,
  posts,
  comments
};

export { db as default };
