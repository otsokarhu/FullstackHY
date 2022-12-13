import { useState } from 'react'
const Blog = ({ handleLike, handleRemove, blog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const userLoggedIn = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
  const rightUser = userLoggedIn.username === blog.user.username

  return (
    <div className="blog">
      {blog.title}, author: {blog.author}
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div style={showWhenVisible} >
        {blog.url} <br />
        likes: {blog.likes}
        <button onClick={(event) => handleLike(event, blog)}>like</button><br />
        {blog.user.name}<br />
        {rightUser && <button onClick={(event) => handleRemove(event, blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog