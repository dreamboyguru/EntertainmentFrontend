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
}, [dispatch, userName])


const handleAddBookmark = (value, type) => {
  const token = Cookies.get('token')
  const userName = Cookies.get('userName')
  if (!token && !userName) {
      // console.log('token is empty...! Please Login First');
      setshowModel(true)
  } else {        
      axios.post('http://localhost:3001/bookmark', { email: userName, video_id: value, type: type })
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
      <div className='flex flex-row h-auto overflow-hidden overflow-x-scroll  sm:scrollbar-hidden max-md:h-auto'>
        { TrendingVideo.map((item, index) => (
          <div className='relative bg-gray-800 m-2 p-1 rounded-lg min-w-[20%] max-w[15%] h-auto max-md:min-w-[75%] max-md:max-w[75%]  max-md:mb-7 transition duration-300 ease-in-out transform hover:scale-105' key={index}>
            <img 
                src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                alt='prop'
                className='w-full h-40 rounded-lg shadow-lg hover:shadow-xl cursor-pointer'
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
                              handleAddBookmark(item.id, item.type)
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
              <div className='flex justify-between items-center p-1 w-full'>
                <div className='flex-col w-full'>
                  <div className='flex flex-row text-xs'>
                      <div className=''>{item.release_date.split('-')[0]}</div>
                      <div className='flex-grow text-center'>{item.type}</div>
                      <div className='mr-2'>{item.adult === 'false' ? 'U/A' : 'U'}</div>
                  </div>
                  <h3 className='text-md font-semibold w-full overflow-x-auto whitespace-nowrap' style={{scrollbarWidth: 'none'}}>{item.original_title}</h3>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>




  )
}

export default Trending
