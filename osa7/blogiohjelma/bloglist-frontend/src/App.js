import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const [users, setUsers] = useState([])

  const padding = {
    padding: 5,
  }

  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll()
      allBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(allBlogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await userService.getAll()
      setUsers(allUsers)
    }
    getUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogIn = async (event, username, password) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }





  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setError('something went wrong')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

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

  const handleRemove = async (event, blog) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        setNotification(`blog ${blog.title} by ${blog.author} removed`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      } catch (exception) {
        setError('something went wrong')
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
  }







  return (
    <Router>
      <div>{user === null ?
        <LoginForm
          error={error}
          handleLogIn={handleLogIn} /> :
        <><div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {user.name} logged in <button onClick={handleLogOut}>logout</button>
        </div><Routes>
            <Route path="/" element={<BlogForm
              notification={notification}
              error={error}
              handleLogOut={handleLogOut}
              addBlog={addBlog}
              blogs={blogs}
              handleLike={handleLike}
              handleRemove={handleRemove}
              user={user}
              users={users} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />

          </Routes></>

      }</div>
    </Router>
  )
}

export default App
