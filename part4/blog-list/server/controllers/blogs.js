const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/api/blogs', (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end();
  } else {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
      response.status(201).json(result);
    });
  }
});

blogsRouter.delete('/api/blogs/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

blogsRouter.put('/api/blogs/:id', (request, response) => {
  const blog = {
    ...request.body,
  };
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).then(
    (updatedBlog) => {
      response.json(updatedBlog);
    }
  );
});
module.exports = blogsRouter;
