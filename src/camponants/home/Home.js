import React from 'react'
import Trending from './Trending'
import Recommended from './Recommended'

const Home = () => {
  return (
    <div className='bg-gray-900 pl-16 pt-24 max-sm:pt-14 max-md:px-1'>
        <div>
          <h1 className='text-xl p-3'>Trending</h1>
          <Trending />
        </div>
        <div >
        <h1 className='text-xl p-3'>Recommended for You</h1>
          <Recommended />
        </div>
    </div>
  )
}

export default Home
