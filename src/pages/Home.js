import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <Link to = "/Respond">
        <button>Generate Slides</button>
      </Link>

    </>    

  )
}

export default Home