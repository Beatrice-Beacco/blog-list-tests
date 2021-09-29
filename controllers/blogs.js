const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Defines the get request. Uses the blog schema to get all the notes
//Async/await syntax
blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

//Defines the post request using the blog schema
//Async/await syntax
blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)
    const newEntry = await blog.save()
    response.status(201).json(newEntry)
})


module.exports = blogsRouter