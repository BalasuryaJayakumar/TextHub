import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import DataContext from './context/DataContext'
import format from "date-fns/format";
import api from './api/posts'

const EditPost = () => {

  const { posts, setPosts } = useContext(DataContext)

  const [ editTitle, setEditTitle ] = useState("")
  const [ editBody, setEditBody ] = useState("")

  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  const navigate = useNavigate()

  useEffect(() => {
    if(post) {
      setEditBody(post.body)
      setEditTitle(post.title)
  }
  }, [ post, setEditBody, setEditTitle])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title:editTitle, datetime, body:editBody }
    try {
    const response = await api.put(`/posts/${id}`, updatedPost)
    setPosts(posts.map(post => post.id === id ? {...response.data} : post))
    setEditBody("")
    setEditTitle("")
    navigate(`/post/${id}`)
    } catch (err) {
    console.log(`Error: ${err.message}`)
    }
}

  return (
    <main className='newPost'>
      { editTitle && 
        <>
          <h2>Edit Post</h2>
          <form className='postForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input 
              id='postTitle'
              type="text" 
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea 
              id="postBody" 
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button 
              type='submit'
              aria-label='Post Edited'
              onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </form>
        </>
      }
      { !editTitle && 
        <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p><Link to='/'>Visit Our Homepage</Link></p>
      </>
      }
    </main>
  )
}

export default EditPost