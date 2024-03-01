import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Index() {
    const [count, setCount] = useState([]);
    const [file, setFile] = useState();  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/video`);
                setCount(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run effect only once after mount

     
    const insertData = async () => {
      try {
          const response = await axios.post(`http://localhost:3001/videos/insert`);
          console.log(response.data);
          // dispatch(getmovie(response.data));
      } catch (err) {
          console.log(err);
      }
    };

    const handletrailerUpload = (id) => {
      const formdata = new FormData();
      formdata.append('trailer', file);
      console.log(formdata);
      axios.post(`http://localhost:3001/admin/trailer/${id}`, formdata)
          .then(res => {console.log(res) 
            window.location.reload()
          })
          .catch(err => console.log(err));
    }

    const handlevideoUpload = (id) => {
      const formdata = new FormData();
      formdata.append('video', file);
      console.log(formdata);
      axios.post(`http://localhost:3001/admin/video/${id}`, formdata)
          .then(res => {console.log(res) 
            window.location.reload()
          })
          .catch(err => console.log(err));
    }
  
    return (
      <div className='flex flex-col bg-gray-900'>
        <div>
          {/* <Link to='/AddNew' className='bg-white text-black mt-28 float-end mr-20 rounded-md p-1 hover:text-white hover:bg-gray-400'>Add New</Link> */}
          <button onClick={()=>insertData()} className='bg-white text-black mt-28 float-end mr-20 rounded-md p-1 px-3 hover:text-white hover:bg-gray-400'>Insert Data</button>
        </div>
        <div className='bg-gray-900 h-auto px-5 mt-2'>
            
            <div className='flex flex-wrap'>
                {count.map((item, index) => (
                    <div key={index} className='bg-gray-950 h-auto w-[16%] m-1 mb-2 p-2 rounded-md max-sm:w-full'>
                        <div className=' text-white'>
                          <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='w-[90%] ml-[5%] h-52'/>
                        </div>
                        <div>
                          <div className='text-center text-lg font-mono'>{item.type === 'movie'? item.original_title : item.original_name}</div>
                        </div>
                        <div className=' flex-col'>
                          {/* {item.trailer === undefined || item.trailer === null || item.trailer === '' ?
                            <div className=''>
                              <label>Trailer</label><br/>
                              <input type="file" onChange={e => setFile(e.target.files[0])} className='size-20 text-xs h-6'/>
                              <button onClick={()=>handletrailerUpload(item._id)} 
                                className='bg-white text-black float-end mr-1 mt-1 text-xs h-5 rounded px-1'
                              >Upload</button>
                            </div>
                          : null
                          }
                          {item.video === undefined || item.video === null || item.video === '' ?
                            <div>
                              <label>video</label><br/>
                              <input type="file" onChange={e => setFile(e.target.files[0])} className='size-20 text-xs h-5'/>
                              <button onClick={()=>handlevideoUpload(item._id)}
                                className='bg-white text-black float-end mr-1 mt-1 text-xs h-5 rounded px-1'
                              >Upload</button>
                            </div>
                          : null
                          } */}
                          {/* <button className='bg-gray-500 p-1 w-[47%] rounded-md float-end mr-1'>video</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
}

export default Index;
