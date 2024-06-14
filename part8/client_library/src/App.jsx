import { useState } from "react";
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.title).includes(object.title)

    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: null },
    })
    console.log('dataInStore', dataInStore)
    console.log('addedBook', addedBook)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('ENTRA PARA ACTUALIZAR CACHE')

      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: null },
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      window.alert(`New book added: ${data.data.bookAdded.title}`)
      updateCacheWith(data.data.bookAdded)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage('recommendations')}>recommend</button>
        ) : null}
        {token ? <button onClick={logout}>logout</button> : null}
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : null}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommendations show={page === 'recommendations'} />
    </div>
  )
}

export default App;
