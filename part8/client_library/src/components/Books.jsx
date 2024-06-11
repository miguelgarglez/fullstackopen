import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result_books = useQuery(ALL_BOOKS, {
    variables: { genre },
  })

  const result_genres = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if (result_books.loading) {
    return <div>loading...</div>
  }

  const books = result_books.data.allBooks

  const genres = result_genres.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      )}
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
      <Genres genres={genres} setGenre={setGenre} />
    </div>
  )
}

const Genres = ({ genres, setGenre }) => {
  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
