import Notification from './Notification'
import Error from './Error'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import Users from './Users'


const BlogForm = ({
  notification,
  error,
  addBlog,
  blogs,
  users
}) => (

  <div>
    <h2>blogs</h2>
    <Notification message={notification} />
    <Error message={error} />

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

        />
      ))}
    </div>
    <div>
      <Users users={users} />
    </div>
  </div>

)

export default BlogForm