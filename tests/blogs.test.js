const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)


//Checks if the data is in JSON format
//Checks for the hardcoded length of the notes
//Checks if the first note has the "id" propriety
test('returned blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(1)
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

afterAll(() => {
    mongoose.connection.close()
})




