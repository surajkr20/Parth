import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoArrowBackCircle } from "react-icons/io5";

const AsistantName = () => {
  const { serverUrl, user, selectedImage, backendImage, setUser, loading, setLoading } = useContext(AuthContext);
  const [assistantName, setAssistantName] = useState(user?.AsistantName || "");
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("assistantImage", selectedImage);
      }

      const res = await axios.post(`${serverUrl}/api/user/update`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setUser(res.data);
      console.log("Updated user:", res.data);
      navigate("/");
      toast.success("Assistant profile updated")
    } catch (error) {
      setLoading(false);
      console.log("assistant update error:", error);
      toast.success(error.response.data.message);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#070731] flex flex-col gap-8 items-center justify-center relative'>
      <IoArrowBackCircle className='absolute top-[30px] left-[30px] text-white text-5xl cursor-pointer hover:scale-105 hover:text-red-200' onClick={()=>navigate("/customized")}/>
      
      <h1 className='text-white md:text-4xl text-lg font-serif text-center'>Enter your <span className='font-bold text-orange-400'>Assistant Name</span></h1>

      <input value={assistantName} type="text" placeholder='Ex-Alexa' className='w-[30%] py-2 rounded-2xl bg-transparent border text-white font-semibold text-xl px-6 text-center' required onChange={(e) => setAssistantName(e.target.value)} />

      {assistantName && <button className="w-[200px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition duration-200 rounded-2xl" disabled={loading} onClick={() => {
        handleUpdateAssistant();
        navigate("/")
      }}>{!loading? "Create your assistant" : "Loading.."}</button>}
    </div>
  )
}

export default AsistantName;