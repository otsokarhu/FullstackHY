import blogService from '../services/blogs'
import { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'


const SingleBlog = () => {
  const [blogs, setBlogs] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const handleLike = async (event, blog) => {
    event.preventDefault()
    try {
      const updBlog = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
      updBlog.user = {
        username: blog.user.username,
        name: blog.user.name,
      }
      const updBlogs = blogs
        .map((b) => (b.id !== blog.id ? b : updBlog))
        .sort((a, b) => b.likes - a.likes)
      setBlogs(updBlogs)
    } catch (exception) {
      setError('something went wrong')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }


  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    getBlogs()
  }, [])



  const match = useMatch('/blogs/:id')

  const blogId = match?.params?.id

  const blogToShow = blogs?.find((blog) => blog.id === blogId)





  if (!blogToShow) {
    return null
  }

  return (
    <div>
      <h2>{blogToShow.title} by {blogToShow.author}</h2>
      <a href={`https://${blogToShow.url}`}> {blogToShow.url}</a>
      <p>{blogToShow.likes} likes <button onClick={(event) => handleLike(event, blogToShow)}>like</button><br /></p>
      <p>added by {blogToShow.user.name}</p>
    </div>
  )
}

export default SingleBlog