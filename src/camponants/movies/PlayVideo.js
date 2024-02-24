import React from 'react';
import { RxCross2 } from 'react-icons/rx';

function PlayVideo({ isVisiblevideo, onClosevideo, videoName }) {
    const handleClose = (e) => {
        if (e.target.id === 'wrapperr') return onClosevideo();
    };  

    if (!isVisiblevideo) return null;

    return (
        <>
        <div className='fixed inset-0 bg-white text-white bg-opacity-25 backdrop-blur-md h-full w-full z-40' id='wrapperr' onClick={(e) => handleClose(e)}>
            <div className='flex flex-row bg-black mx-52 mt-16 rounded-md h-auto max-md:mx-4'>
                <button 
                        className='absolute top-16 right-52 text-white text-xl z-50 max-md:right-4'
                        onClick={onClosevideo}
                >
                    <RxCross2 className='font-bold size-6 hover:text-red-600 hover:size-8 hover:font-extrabold hover:-mt-1 hover:-mr-1' />
                </button>
                <video controls className="w-full">
                    <source src={`http://localhost:3001/images/${videoName}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
            </div>
        </div>
        </>
    );
}

export default PlayVideo;
