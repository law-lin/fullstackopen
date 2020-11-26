const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
// Exercise 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(helper.initialBlogs.length);
});
// Exercise 4.9
test('id exists as a blog property', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((blog) => {
    console.log(blog);
    expect(blog.id).toBeDefined();
  });
});
// Exercise 4.10
test('a blog can be created', async () => {
  const newBlog = {
    title: 'Wonderful Dream',
    author: 'Mr. Bob',
    url: 'http://www.google.com',
    likes: 2,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain('Wonderful Dream');
});
// Exercise 4.11
test('likes defaults to 0 if missing from request', async () => {
  const newBlog = {
    title: 'Wonderful Dream',
    author: 'Mr. Bob',
    url: 'http://www.google.com',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const addedBlog = blogsAtEnd.filter(
    (blog) => blog.title === 'Wonderful Dream'
  )[0];
  expect(addedBlog.likes).toBe(0);
});
// Exercise 4.12
test('a blog without title and url cannot be added', async () => {
  const newBlog = {
    url: 'http://www.google.com',
    likes: 12,
  };
  await api.post('/api/blogs').send(newBlog).expect(400);
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    console.log(blogToDelete);
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('update of a blog', () => {
  test.only('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: 100,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const likes = blogsAtEnd.map((b) => b.likes);
    expect(likes).toContain(updatedBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
