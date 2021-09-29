const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Defines the get request using the blog schema
blogsRouter.get('', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

//Defines the post request using the blog schema
blogsRouter.post('', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})


module.exports = blogsRouter