import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Loginform'
import Recommend from './components/Recommended'
import { useApolloClient } from '@apollo/client'



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (!token)
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <LoginForm
          setToken={setToken}
          show={page === 'login'}
          setPage={setPage} />
      </div>
    )



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>see recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors token={token} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook
        show={page === 'add'}
        setPage={setPage} />

      <Recommend show={page === 'recommend'} />

    </div>
  )
}

export default App
