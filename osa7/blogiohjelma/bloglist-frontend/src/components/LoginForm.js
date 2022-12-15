import Error from "./Error"
import { useState } from "react"


const LoginForm = ({ error, handleLogIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div>
      <h2>Log in to application</h2>
      <Error message={error} />
      <form onSubmit={(event) => handleLogIn(event, username, password)}>
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
        <button type="submit" id="loginbutton">
          login
        </button>
      </form>
    </div>
  )
}


export default LoginForm