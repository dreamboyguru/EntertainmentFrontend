import React, { useEffect, useState } from 'react'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import '../../App.css'
import axios from 'axios';
import { getTrending } from '../../redux/TrendingSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login'
import PlayPage from '../movies/PlayPage';
import Cookies from 'js-cookie';

const Trending = () => {

  let showBookmark = false
  const userName = Cookies.get('userName')
 
  const [playPageVisible, setPlayPageVisible] = useState(false);
  const [data, setData] = useState(null); 
  
  const [showModel, setshowModel] = useState(false);

  const dispatch = useDispatch();
  const TrendingVideo = useSelector((state)=> state.trending.trending)
  
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/trending/${userName}`);
            // console.log(response.data);
            dispatch(getTrending(response.data));
        } catch (err) {
            console.log(err);
        }
    };
    fetchData();
}, [dispatch])


const handleAddBookmark = (value) => {
  const token = Cookies.get('token')
  const userName = Cookies.get('userName')
  if (!token && !userName) {
      // console.log('token is empty...! Please Login First');
      setshowModel(true)
  } else {        
      axios.post('http://localhost:3001/bookmark', { email: userName, video_id: value })
      .then(response => {

          console.log('Response from server:', response.data.video_id);
          window.location.reload()
          // Handle the response data as needed
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle errors
      });
  }
}

const handleRemoveBookmark = (value) => {
  const token = Cookies.get('token')
  const userName = Cookies.get('userName')
  if (!token && !userName) {
      console.log('token is empty...! Please Login First');
  } else {        
      axios.delete(`http://localhost:3001/bookmark/${value}`)
      .then(response => {
          window.location.reload()
          console.log(response);
          // Handle the response data as needed
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle errors
      });
  }
}
  return (
    <div className='flex flex-col'>
      <Login isvisible={showModel} onClose={()=>setshowModel(false)} />
      <PlayPage isVisible={playPageVisible} onClose={()=>setPlayPageVisible(false)} passData={data}/>
      <div className='flex flex-row h-64 overflow-hidden overflow-x-scroll  sm:scrollbar-hidden max-md:h-auto'>
        { TrendingVideo.map((item, index) => (
          <div className='relative m-2 rounded-lg min-w-[20%] max-w[20%] h-52 max-md:min-w-[75%] max-md:max-w[75%]  max-md:mb-7 pb-5' key={index}>
            <img 
                src={`http://localhost:3001/images/${item.image}`}
                alt='prop'
                className='w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer'
                onClick={() => {
                setPlayPageVisible(true)
                setData(item)
                }}
            />
              {
              (item.joinedData[0] === undefined) ? (
                  
                  <div>
                      <button className='bg-gray-700 text-white hover:text-gray-950 absolute top-2 right-2 rounded-3xl w-7 h-7' 
                          onClick={() => {
                              handleAddBookmark(item.id)
                          }}
                      >
                          <FaRegBookmark className='ml-1.5' />
                      </button>
                  </div>
              ) : (
                <button className='bg-gray-700 absolute top-2 right-2 rounded-3xl w-7 h-7'
                    onClick={() => {
                        handleRemoveBookmark(item.id)
                    }}
                >
                    <FaBookmark className='ml-1.5' />
                </button>
              )}
              <div className='absolute flex justify-between items-center p-1'>
                <div className='flex-col w-full'>
                  <div className='flex flex-row text-xs'>
                      <div>{item.year}</div>
                      <div className='px-5'>{item.type}</div>
                      <div>{item.grade}+</div>
                  </div>
                  <h3 className='text-md font-semibold'>{item.tittle}</h3>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>




  )
}

export default Trending
