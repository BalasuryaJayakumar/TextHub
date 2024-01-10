import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const { searchResult, fetchError, isLoading } = useContext(DataContext)
  const posts = searchResult

  return (
    <main className='home'>
      { isLoading && <p className='statusMsg'>Loading Posts...</p> }
      { !isLoading && fetchError && <p className='statusMsg' style={{color: "red"}}>{fetchError}</p> }
      { !isLoading && !fetchError && (posts.length) ? <Feed posts={posts} /> : <p className='statusMsg'>No Posts to Display.</p>}
    </main>
  )
}

export default Home