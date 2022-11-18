const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('./list_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { request } = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = listHelper.severealBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'kayttaja', passwordHash })
    await user.save()

    const token = await api
        .post('/api/login')
        .send({ username: 'kayttaja', password: 'sekret' })

    request.token = token.body.token
})



describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(listHelper.severealBlogs.length)
    })

    test('blog has id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('adding blogs', () => {

    test('a valid blog can not be added without authorization', async () => {
        const newBlog = {
            title: "noToken",
            author: "Markus Nuottanen",
            url: "https://ainoastaanfanit.com/",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

    })

    test('a valid blog can be added', async () => {
        const users = await api.get('/api/users')
        const newBlog = {
            title: "FullStack or FullSack",
            author: "Markus Nuottanen",
            url: "https://ainoastaanfanit.com/",
            likes: 69,
            userId: users.body[0].id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${request.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(listHelper.severealBlogs.length + 1)
        expect(titles).toContain(
            'FullStack or FullSack'
        )
    })

    test('a blog with undefined likes gets 0 likes', async () => {
        const users = await api.get('/api/users')
        const newBlog = {
            title: "Viru Valge on kõige parem",
            author: "Oskari",
            url: "https://eestinmaa.com/",
            userId: users.body[0].id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${request.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInEnd = await listHelper.blogsInDb()
        const addedBlog = blogsInEnd.find(blog => blog.title === 'Viru Valge on kõige parem')
        expect(addedBlog.likes).toBe(0)

    })

    test('a blog without title and url is not added', async () => {
        const newBlog = {
            author: "Markku Linnunpönttö",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${request.token}`)
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(listHelper.severealBlogs.length)
    })

})

describe('altering blogs', () => {

    test('a blog can be deleted', async () => {
        const users = await api.get('/api/users')

        const newBlog = {
            title: "FullStack or FullSack",
            author: "Markus Nuottanen",
            url: "https://ainoastaanfanit.com/",
            likes: 6969,
            user: users.body[0].id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${request.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let response = await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${request.token}`)

        let blogToDelete = response.body.find(blog => blog.title === 'FullStack or FullSack')
        expect(blogToDelete).toBeDefined()

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${request.token}`)
            .expect(204)

        response = await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${request.token}`)

        const titles = response.body.map(r => r.title)
        expect(titles).not.toContain('FullStack or FullSack')

    })

    test('a blog can be altered', async () => {
        const blogsAtStart = await listHelper.blogsInDb()
        const blogToAlter = blogsAtStart[0]
        const alteredBlog = {
            title: "FullStack or FullSack",
            author: "Markus Nuottanen",
            url: "https://ainoastaanfanit.com/",
            likes: 6969,
        }
        await api
            .put(`/api/blogs/${blogToAlter.id}`)
            .send(alteredBlog)
            .expect(200)

        const blogsAtEnd = await listHelper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(listHelper.severealBlogs.length)
        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).toContain(alteredBlog.title)


    })
})


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await listHelper.usersInDb()

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

        const usersAtEnd = await listHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('creating users', () => {

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await listHelper.usersInDb()

        const newUser = {
            username: 'kayttaja',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await listHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username is too short', async () => {
        const usersAtStart = await listHelper.usersInDb()

        const newUser = {
            username: 'os',
            name: 'Oskari',
            password: 'viruvalge'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username should be at least 3 characters long')
        const usersAtEnd = await listHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is too short', async () => {
        const usersAtStart = await listHelper.usersInDb()

        const newUser = {
            username: 'oskarsson',
            name: 'Oskari',
            password: 'vv'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password should be at least 3 characters long')
        const usersAtEnd = await listHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })
})



afterAll(() => {
    mongoose.connection.close()
})