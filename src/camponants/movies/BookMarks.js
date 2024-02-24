import React, { useEffect, useState } from 'react';
// import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getbookmarks } from '../../redux/Bookmark';
import PlayPage from './PlayPage';
import { FaBookmark } from 'react-icons/fa';

const BookMarks = () => {
  const [playPageVisible, setPlayPageVisible] = useState(false);
  const [data, setData] = useState(null); 
  const userName = Cookies.get('userName');
  const dispatch = useDispatch();
  const bookmarkVideo = useSelector((state) => state.bookmarks.bookmarks);
    
  useEffect(() => {
    const token = Cookies.get('token');
    const userName = Cookies.get('userName');


    if (!token || !userName) {
        console.log('Token or userName is missing. Please log in first.');
        // Optionally, redirect the user to the login page here
        return; // Exit the useEffect hook early
    }

    const fetchData = async () => {
      try {
          const response = await axios.get(`http://localhost:3001/bookmark/${userName}`);
          // console.log(response.data);
          dispatch(getbookmarks(response.data));
      } catch (err) {
          console.log(err);
      }
    };
    fetchData();

  }, [dispatch]); // Add dependencies token and userName to the array

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
        <>
            <PlayPage isVisible={playPageVisible} onClose={()=>setPlayPageVisible(false)} passData={data}/>
            <div className='bg-gray-900 pl-16 pt-24 max-sm:pt-14 max-md:px-1 min-h-screen'>
                <div>
                    <h1 className='text-xl p-3'>Bookmarked Videos</h1>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-wrap h-auto'>
                        {bookmarkVideo.map((item, index) => {
                            if(item.joinedData[0] !== undefined && item.joinedData[0].email === userName) {
                              
                                return(
                                    <div className='relative m-2 rounded-lg w-[18%] max-md:w-[95%] mb-14 max-h-52' key={index}>
                                        <img
                                            src={`http://localhost:3001/images/${item.image}`}
                                            alt='prop'
                                            className='w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer'
                                            onClick={() => {
                                            setPlayPageVisible(true)
                                            setData(item)
                                            }}
                                        />
                                        <div>
                                            <button className='bg-gray-700 absolute top-2 right-2 rounded-3xl w-7 h-7'
                                                onClick={() => {
                                                    handleRemoveBookmark(item.id)
                                                }}
                                            >
                                                <FaBookmark className='ml-1.5' />
                                            </button>
                                        </div>

                                        {/* <button className='bg-gray-700 text-white hover:text-gray-950 absolute top-2 right-2 rounded-3xl w-7 h-7'
                                            onClick={()=> handleAddBookmark(item.id)}
                                        >
                                            <FaRegBookmark className='ml-1.5' />
                                        </button> */}
                                        <div className='absolute flex justify-between items-center p-1'>
                                            <div className='flex-col'>
                                            <div className='flex flex-row text-xs'>
                                                <div>{item.year}</div>
                                                <div className='px-5'>{item.type}</div>
                                                <div>{item.grade}+</div>
                                            </div>
                                            <h3 className='text-md font-semibold'>{item.tittle}</h3>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        }
                        
                                    


                        )}
                            
                            
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookMarks;
