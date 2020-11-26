const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });
  return sum;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostBlogs = (blogs) => {
  // returns the author who has the largest amount of blogs, and their number of blogs
  const authors = _.countBy(blogs, 'author');
  const authorWithMostBlogs = _.maxBy(Object.keys(authors), (o) => authors[o]);
  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  let maxLikes = 0;
  let authorWithMostLikes = {};
  const authorLikes = blogs.reduce((blog, { author, likes }) => {
    blog[author] = blog[author] || 0;
    blog[author] += likes;
    if (maxLikes < blog[author]) {
      maxLikes = blog[author];
      authorWithMostLikes = {
        author,
        likes: blog[author],
      };
    }
    return blog;
  }, {});
  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
