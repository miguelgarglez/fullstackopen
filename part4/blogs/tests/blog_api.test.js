/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })


    test('blog has an id property', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})



describe('viewing a specific blog', () => {
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(titles).toContain(
            'React patterns'
        )
    })
})


describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(helper.blogToAdd.title)
    })

    test('a blog without likes has 0 likes', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const blog = response.body.find(blog => blog.title === helper.blogWithoutLikes.title)
        expect(blog.likes).toBe(0)
    })


    test('a blog without title and url is not added', async () => {
        await api
            .post('/api/blogs')
            .send(helper.invalidBlogs[0])
            .expect(400)
        await api
            .post('/api/blogs')
            .send(helper.invalidBlogs[1])
            .expect(400)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})


describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updatedBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 99
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.title).toBe(updatedBlog.title)
                expect(response.body.author).toBe(updatedBlog.author)
                expect(response.body.url).toBe(updatedBlog.url)
                expect(response.body.likes).toBe(updatedBlog.likes)
            })
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        const updatedLikes = blogsAtEnd.find(blog => blog.id === blogToUpdate.id).likes
        expect(updatedLikes).toBe(99)
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})