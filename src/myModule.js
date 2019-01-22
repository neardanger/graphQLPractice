const message = "Some message from myModule.js";
const name = "Steven";
const location = "Los Angeles";

const greetMe = name => {
  console.log(`Hello ${name}`);
};

export { message, name, greetMe, location as default };
