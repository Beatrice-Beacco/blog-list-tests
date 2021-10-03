const Blog = require('../models/blog')

const initialBlogs = [{
    name: "Post",
    author: "Me",
    link: "coolblog.com",
    likes: 1,
},
{
    name: "Post 2",
    author: "Me",
    link: "coolblog.com",
}]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    console.log(blogs);
    return blogs.map(blog => blog.toJSON())
}


module.exports = {initialBlogs, blogsInDb}
