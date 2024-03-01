import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getRecommend } from '../../redux/RecommendSlice';
import PlayPage from '../movies/PlayPage';
import Login from '../Login'
import Cookies from 'js-cookie';

const Recommended = () => {
    const [showModel, setshowModel] = useState(false);

    const userName = Cookies.get('userName')
    const dispatch = useDispatch();
    const RecommendVideo = useSelector((state) => state.recommend.recommend);

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recommend/${userName}`);
                // console.log(response.data);
                dispatch(getRecommend(response.data));
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [dispatch, userName]);

    const [playPageVisible, setPlayPageVisible] = useState(false);
    const [data, setData] = useState(null); 

    
    return (
        <>
            <Login isvisible={showModel} onClose={()=>setshowModel(false)} />
            <PlayPage isVisible={playPageVisible} onClose={()=>setPlayPageVisible(false)} passData={data}/>
            <div className='bg-gray-900 max-sm:pt-0 max-md:px-1 h-auto min-h-screen'>
                
                <div className='flex flex-col'>
                    <div className='flex flex-wrap h-auto'>
                        {RecommendVideo.map((item, index) => {
                            return(
                                <div className='bg-gray-800 m-2 p-1 rounded-lg w-[13%] max-lg:w-[20%] max-xl:w-[15%] max-md:w-[95%] mb-5 h-suto shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105' key={index}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt='prop'
                                        className='w-full h-52 object-cover rounded-lg shadow-lg cursor-pointer'
                                        onClick={() => {
                                        setPlayPageVisible(true)
                                        setData(item)
                                        }}
                                    />
                                    {
                                        // console.log(item.joinedData)
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
                                    
                                    {/* <button className='bg-gray-700 text-white hover:text-gray-950 absolute top-2 right-2 rounded-3xl w-7 h-7'
                                        onClick={()=> handleAddBookmark(item.id)}
                                    >
                                        <FaRegBookmark className='ml-1.5' />
                                    </button> */}
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

                            )
                            
                        }
                        
                                    


                        )}
                            
                            
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recommended;
