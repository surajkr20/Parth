import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Card = ({ image }) => {
  const { setSelectedImage, selectedImage, setBackendImage, setFrontendImage } = useContext(AuthContext);
  return (
    <div className={`w-[100px] h-[120px] md:w-[200px] md:h-[250px] bg-[#02020a] border-2 border-blue-300 rounded-2xl overflow-hidden hover:shadow-md cursor-pointer ${selectedImage == image ? "border-4 border-white shadow-2xl shadow-blue-900" : null}`} onClick={() => {
      setSelectedImage(image);
      setBackendImage(null);
      setFrontendImage(null);
    }}>
      <img src={image} alt="assistant-img" className='h-full w-full object-fill rounded-2xl p-1' />
    </div>
  )
}

export default Card;