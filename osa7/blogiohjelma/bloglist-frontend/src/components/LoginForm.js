import Error from "./Error"
import { useState } from "react"
import { Form, Button } from 'react-bootstrap'


const LoginForm = ({ error, handleLogIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div>
      <h2>Log in to application</h2>
      <Error message={error} />
      <Form onSubmit={(event) => handleLogIn(event, username, password)}>
        <Form.Group>
          <Form.Label>username:</Form.Label>

          <Form.Control
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit" id="loginbutton">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default LoginForm