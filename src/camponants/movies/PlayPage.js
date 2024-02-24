import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PlayVideo from './PlayVideo';

function PlayPage({ isVisible, onClose, passData }) {
    const [videoModel, setvideoModel] = useState(false);
    const handleClose = (e) => {
        if (e.target.id === 'wrapperr') return onClose();
    };  

    if (!isVisible) return null;

    return (
        <>
        <PlayVideo isVisiblevideo={videoModel} onClosevideo={()=>setvideoModel(false)} videoName={passData.image} />
        <div className='fixed inset-0 bg-black text-white bg-opacity-25 backdrop-blur-sm h-full w-full z-30' id='wrapperr' onClick={(e) => handleClose(e)}>
            <div className='flex flex-row max-md:flex-col bg-black mx-48 my-10 rounded-md max-md:mx-2 max-md:mt-5'>
                <button 
                        className='absolute top-10 right-48 text-white text-xl max-md:right-2 max-md:top-5'
                        onClick={onClose}
                >
                    <RxCross2 className='font-bold size-6 hover:text-red-600 hover:size-8 hover:font-extrabold hover:-mt-1 hover:-mr-1' />
                </button>
                <div className=' w-[50%] p-10 max-md:p-2 max-md:w-[80%] max-md:ml-[10%]'>
                    <div className='border-2 w-full overflow-hidden max-md:h-60'>
                        <img src={`http://localhost:3001/images/${passData.image}`} alt="img" className="w-96 h-80 object-cover" />
                    </div>
                    <div>
                        <button className='mt-5 w-full p-2 text-black rounded-md bg-white hover:bg-gray-400 max-md:p-0.5 max-md:text-md max-md:mt-1'
                        onClick={()=>{
                            setvideoModel(true)
                        }}
                    >Watch</button>
                    </div>
                </div>
                <div className=' w-full p-10 max-md:px-2 max-md:-mt-10'>
                    <div className='w-full'>
                        <div>
                            <h1 className='text-4xl max-md:text-lg max-md:font-semibold'>{passData.tittle} : Powerfull people come from Powerfull Places</h1>
                            <h1 className='text-4xl max-md:text-lg'>3.9 *****</h1>
                        </div>
                        <div className='flex flex-row p-2 max-md:p-0.5'>
                            <div className='w-full'>
                                <div className='max-md:text-sm font-semibold'>Length</div>
                                <div className='max-md:text-xs'>88 min.</div>
                            </div>
                            <div className='w-full'>
                                <div className='max-md:text-sm font-semibold'>Language</div>
                                <div className='max-md:text-xs'>English</div>
                            </div>
                            <div className='w-full'>
                                <div className='max-md:text-sm font-semibold'>Year</div>
                                <div className='max-md:text-xs'>{passData.year}</div>
                            </div>
                            <div className='w-full'>
                                <div className='max-md:text-sm font-semibold'>Status</div>
                                <div className='max-md:text-xs'>N/A</div>
                            </div>
                        </div>
                        <div className='text-md font-semibold mb-2 max-md:mb-0.5 max-md:text-sm'>Genre</div>
                        <div className='flex flex-wrap'>
                            <div className='bg-white rounded-md text-black px-2 py-1 max-md:px-1 max-md:py-0.5 text-xs mx-2 font-medium'>Documentary</div>
                            <div className='bg-white rounded-md text-black px-2 py-1 max-md:px-1 max-md:py-0.5 text-xs mx-2 font-medium'>History</div>
                        </div>

                        <div className='mt-4 max-md:mt-1'>
                            <div className='text-md font-semibold mb-2 max-md:mb-0 max-md:text-sm'>Synopsis</div>
                            <div className='text-sm text-justify max-md:text-xs'>Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved.</div>
                        </div>

                        <div className='mt-4 max-md:mt-1'>
                            <div className='text-md font-semibold mb-2 max-md:mb-0 max-md:text-sm'>Casts</div>
                            <div className='flex flex-wrap'>
                                {(passData.actors).split(',').map((item) => (
                                    <div className='border border-gray-300 px-2 max-md:px-1 max-md:font-semibold max-md:pb-0.5 rounded-md m-1 max-md:text-xs '>{item}</div>
                                ))}                                                                       
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default PlayPage;
