const matter = require('gray-matter');

console.log(
  matter.read("./site/content/post/jamaica-blue.md")
);
