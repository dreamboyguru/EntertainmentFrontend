import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/UserSlice'


function Users() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    // console.log(useSelector(state => state.users.users));

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get('http://localhost:3001');
                dispatch(getUser(response.data));
                // console.log(response);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    })
  return (
    <div>
      {users.map(user => {
        return (
            <div className='text-black mt-52 font-extrabold size-24'>{user.name} </div> 
        )
      })}
    </div>
  )
}

export default Users
