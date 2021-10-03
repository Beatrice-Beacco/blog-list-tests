const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

//Deletes an entry based on the id
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

//Add new entries
blogsRouter.put('/:id', async (request, response) => {

    const body = request.body

    const entry = {
        title: body.title,
        author: body.autor,
        url: body.url,
        likes: body.likes,
        id: request.params.id
    }

    const updated = await Blog.findByIdAndUpdate(request.params.id, entry)

    response.json(updated)
})

//Defines the get request. Uses the blog schema to get all the notes
//Async/await syntax
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

//Defines the post request using the blog schema
//Async/await syntax
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const newEntry = await blog.save()
    response.status(201).json(newEntry)
})

module.exports = blogsRouter