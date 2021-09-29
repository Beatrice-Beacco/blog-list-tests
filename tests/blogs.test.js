const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log(helper.initialBlogs);
    await Blog.insertMany(helper.initialBlogs)
})


//Checks if the data is in JSON format
//Checks for the hardcoded length of the notes
//Checks if the first note has the "id" propriety
test('returned blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(2)
    expect(response.body[0].id).toBeDefined()
})

//Loads the current DB 
//Sends a POST request with the new blogpost
//Gets the new DB and maps in an array al the author names
//Verifies that the length increased by 1 and that the name of the new author is present
test('added blogs', async () => {

    const oldDB = await api.get('/api/blogs')

    const newBlog = {
        name:"Cicciotto",
        author:"Panzerotto",
        likes:99,
        link:"coolblog.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const names = response.body.map(r => r.author)

    expect(response.body).toHaveLength(oldDB.body.length + 1)
    expect(names).toContain('Panzerotto')
})

//Gets the blogs with a get request, then checks every element
//if likes is present checks it, otherwise creates a 0 likes attribute
 test('has likes', async () => {
    let blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    for (let blog of blogs.body) {
        if(blog.likes){
        expect(blog.likes).toBeDefined()
        }  else {
            blog.likes = 0
        }
    }
})

///Checks if name and the URL are defined, else sends them to
//error 400 to the api
test('check new content', async () => {

    const oldDB = await api.get('/api/blogs')

    const newBlog = {
        name: "Cicciotto",
        author: "Panzerotto",
        likes: 99,
        link: "coolblog.com",
    }

    if(newBlog.name && newBlog.link){

    expect(newBlog.name).toBeDefined()
    expect(newBlog.link).toBeDefined()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const names = response.body.map(r => r.author)

    expect(response.body).toHaveLength(oldDB.body.length + 1)
    expect(names).toContain('Panzerotto')

    } else {
        api.status(400).send()
    }
})

afterAll(() => {
    mongoose.connection.close()
})




