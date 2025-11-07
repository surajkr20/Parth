import React, { useContext, useRef } from 'react';
import Card from '../components/Card';
import Assistant from "../assets/assistant.png";
import Assistant2 from "../assets/assistant2.jpeg";
import { MdDriveFolderUpload } from "react-icons/md";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Customized = () => {
  const inputImage = useRef();
  const { frontendImage, setFrontendImage, setBackendImage, setSelectedImage, selectedImage } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleImage = (e) =>{
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#070731] flex flex-col gap-8 items-center justify-center'>
      <h1 className='text-white md:text-3xl text-lg font-serif text-center'>Select your <span className='font-bold text-orange-400'>Assistant Image</span> or upload</h1>

      <div className='w-full max-w-[60%] flex items-center justify-center gap-6 flex-wrap'>
        <Card image={Assistant} />
        <Card image={Assistant2} />

        <div className={`w-[100px] h-[120px] md:w-[200px] md:h-[250px] bg-[#02020a] border-2 border-[#272747] rounded-2xl overflow-hidden shadow-lg hover:shadow-md cursor-pointer flex items-center justify-center ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-blue-900" : null}`}
          onClick={()=>{
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && <MdDriveFolderUpload className='text-white text-6xl p-1 rounded-2xl' />}
          {frontendImage && <img src={frontendImage} className='w-full h-full object-cover p-1 rounded-2xl'/>}
        </div>

        <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} required/>
      </div>

      {selectedImage && <button className="w-[200px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200" onClick={()=>navigate('/assistant-name')}>Next</button>}
    </div>
  )
}

export default Customized;