import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../query'


const Books = ({ show }) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('all genres')

  const allBooks = useQuery(ALL_BOOKS)



  useEffect(() => {
    allBooks.data && setBooks(allBooks.data.allBooks)
  }, [allBooks.data])

  if (allBooks.loading) {
    return <div>loading...</div>
  }

  const booksByGenre = (genre) => {
    if (genre === 'all genres') {
      setBooks(allBooks.data.allBooks)
      setGenre('all genres')
    } else {
      setBooks(allBooks.data.allBooks.filter((book) => book.genres.includes(genre)))
      setGenre(genre)
    }
  }


  if (!show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      <div>in genre <b>{genre}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allBooks.data.allBooks.map((book) => book.genres).flat().filter((genre, index, self) => self.indexOf(genre) === index).map((genre) =>
          <button key={genre} onClick={() => booksByGenre(genre)}>{genre}</button>)}
      </div>
      <div>
        <button onClick={() => booksByGenre("all genres")}>all genres</button>
      </div>
    </div>
  )
}

export default Books
