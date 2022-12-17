import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            id="title-input"
          />

          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            id="author-input"
          />

          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            id="url-input"
          />

          <Button variant="success" type="submit" id="create-button">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddBlogForm
