/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {

  // Reset test database
  await Blog.deleteMany({})
  await User.deleteMany({})

  const testUser = await helper.testUser()
  const userObject = new User(testUser)

  const blogsWithUser = helper.initialBlogs.map(blog => ({...blog, user: userObject._id}))
  const blogObjects = blogsWithUser
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  promiseArray.push(userObject.save())
  await Promise.all(promiseArray)

  // login with user and obtain access token
  const response = await api
    .post('/api/login')
    .send({
      username: 'testuser',
      password: 'testpassword',
    });

  token = response.body.token;
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
            .send(helper.invalidBlogs[0])
            .expect(400)
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.invalidBlogs[1])
            .expect(400)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog without token is not added', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogToAdd)
            .expect(401)
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
            .set('Authorization', `Bearer ${token}`)
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

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })


  test('creation fails with proper statuscode and message if username or password length < 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'iu',
      name: 'NonValidUser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})


afterAll(async () => {
  await mongoose.connection.close()
})