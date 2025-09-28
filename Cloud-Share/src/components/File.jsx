import React from 'react'
import { Download } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
const File = () => {
  return (
    <div className='flex flex-col items-center h-screen bg-[url("./bg.jpg")] bg-cover bg-center'>
      <div className='text-4xl mt-10 font-bold'> Welcome to Cloud Share</div>
      <div className='text-xl'> Your one-stop solution for cloud file sharing.</div>
      <div className='mt-5'>
        <div className='bg-white/50 p-5 mt-20 rounded-lg shadow-lg w-100 h-100 border-5 border-dotted border-gray-300'>
        <div className='text-center text-3xl'>Your file is Ready</div>
        <div className='flex flex-col items-center'><DotLottieReact
              src="https://lottie.host/b31bbc3f-b482-431e-84bf-d6689a497740/hxvXmPFlky.lottie"
              loop
              autoplay
              className="w-140 -mt-7 h-70"
            />
            <p className='text-md -mt-7'>File Name . pdf</p></div>
        <div className='flex flex-col items-center'>
          <button className='mt-5 bg-blue-600 text-white p-3 font-semibold rounded-lg w-full hover:bg-purple-700 transition duration-200 ease-in-out'>
           <span className='flex items-center justify-center gap-2'><Download /> Download File</span>
          </button>
        </div>
        
        </div>
      </div>
    </div>
  )
}

export default File