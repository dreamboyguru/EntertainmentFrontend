// Import necessary React components and hooks
import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import SignUp from "./SignUp"
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
 

// Share component for displaying sharing options
const Share = ({ isvisible, onClose }) => {
    const navigate = useNavigate();
    const [SignUpModel, setSignUpModel] = useState(false);
    // Function to close the Share modal
    const handleClose = (e) => {
        if(e.target.id === 'wrapper') return onClose();
    }
    // Return null if the modal is not visible
    if (!isvisible) return null

    // JSX for the Share component
    return (
        <>
        <SignUp isvisible={SignUpModel} onClose={()=>setSignUpModel(false)}/>
        <div 
            className='fixed inset-0 bg-black text-black bg-opacity-25 backdrop-blur-sm h-full w-full z-40'
            id='wrapper'
            onClick={(e)=>handleClose(e)}
        >
            <div className='w-[50%] border-2 ml-96 mt-20 max-lg:m-28 max-md:m-32 max-sm:m-2 max-sm:w-[96%] rounded-md'>

                {/* Close button with RxCross2 icon*/}
                <button 
                    className='text-black text-xl float-end mr-5 mt-3'
                    onClick={()=> onClose()}
                ><RxCross2 className='font-bold size-6 hover:text-red-600 hover:size-8 hover:-mt-1 hover:-mr-1 hover:font-extrabold'/></button>

                
                <div className='bg-white p-5 font-bold'>Sign In</div>
                <hr className='h-1'/>

                <Formik
                    initialValues={{
                        userName : '',
                        password : ''
                    }}
                    validationSchema=''
                    onSubmit = {(values) => {
                        try {
                            axios.post('http://localhost:3001/login', values)
                            .then(response => {
                                Cookies.set('token', response.data.token)
                                Cookies.set('userName', response.data.userName)
                                // console.log(response); // Log the token key to the console
                                // Further actions with the token can be performed here
                                // localStorage.getItem('userName', response.data.useName)
                                onClose();
                                navigate('/')
                              })
                              .catch(error => {
                                console.error('Error during login:', error);
                              });

                        } catch (err) {
                            console.log(err);
                        }
                    }}
                >
                    <Form>
                        <div className='bg-white'>
                            <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                                <label 
                                    htmlFor='userName' 
                                    className='font-bold'
                                >Enter your email</label>
                                <Field  
                                    type='text'
                                    id='userName'
                                    name='userName'
                                    className='border-2 rounded-md border-black h-10'
                                />
                            </div>
                            <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                                <label 
                                    htmlFor='password'
                                    className='font-bold'
                                >Enter Password</label>
                                <Field 
                                    type='password'
                                    id='password'
                                    name='password'
                                    className='border-2 rounded-md border-black h-10'
                                />
                            </div>
                            <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                                <button type='submit' className=' h-10 bg-gray-600 hover:bg-gray-700 rounded-md text-white'>submit </button>
                            </div>
                            <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                                <p onClick={()=>{
                                    setSignUpModel(true)
                                }}
                                > Don`t have account <snan className='text-blue-900 cursor-pointer'>Click here</snan> </p>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        
        </div>
        </>
    )
}

// Export the Share component as the default export
export default Share
