import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Notification from './Notification'
import Error from './Error'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import Users from './Users'

const BlogForm = ({
  notification,
  error,
  user,
  handleLogOut,
  addBlog,
  blogs,
  handleLike,
  handleRemove,
  users
}) => (

  <div>
    <h2>blogs</h2>
    <Notification message={notification} />
    <Error message={error} />
    <p>
      {user.name} logged in
      <button onClick={handleLogOut}>logout</button>
    </p>
    <div>
      <Togglable buttonLabel="new blog">
        <AddBlogForm createBlog={addBlog} />
      </Togglable>
    </div>
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      ))}
    </div>
    <div>
      <Users users={users} />
    </div>
  </div>

)

export default BlogForm