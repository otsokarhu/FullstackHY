import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Error from './components/Error'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)




  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll()
      allBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(allBlogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogIn = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Error message={error} />
      <form onSubmit={handleLogIn}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          type="submit"
          id="loginbutton"
        >login</button>
      </form>
    </div>
  )

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setError('information missing')
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
        user: blog.user.id
      })
      updBlog.user = {
        username: blog.user.username,
        name: blog.user.name
      }
      const updBlogs = blogs
        .map(b => b.id !== blog.id ? b : updBlog)
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
        setBlogs(blogs.filter(b => b.id !== blog.id))
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



  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <Error message={error} />
      <p>{user.name} logged in
        <button onClick={handleLogOut}>logout</button></p>
      <div>
        <Togglable buttonLabel="new blog">
          <AddBlogForm
            createBlog={addBlog}
          />
        </Togglable>
      </div>
      <div>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
      )}</div>
    </div>

  )


  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }

    </div>
  )
}

export default App
