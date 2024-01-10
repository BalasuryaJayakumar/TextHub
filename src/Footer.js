import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const Footer = () => {

  const { posts } = useContext(DataContext)

  const length = posts.length
  return (
    <footer className='footer'>
      <p>{length} {length === 1  ? "post" : "posts" } </p>
    </footer>
  )
}

export default Footer