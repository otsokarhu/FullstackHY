import Error from './Error'

const LoginForm = ({
  handleLogIn,
  username,
  password,
  error,
  setUsername,
  setPassword
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogIn}>
      <Error message={error} />
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

export default LoginForm