import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const AsistantName = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [AssistantName, setAssistantName] = useState(user?.AsistantName || "");
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#070731] flex flex-col gap-8 items-center justify-center'>
      <h1 className='text-white md:text-4xl text-lg font-serif text-center'>Enter your <span className='font-bold text-orange-400'>Assistant Name</span></h1>
      
      <input value={AssistantName} type="text" placeholder='Ex-Alexa' className='w-[30%] py-2 rounded-2xl bg-transparent border text-white font-semibold text-xl px-6 text-center' required onChange={(e)=>setAssistantName(e.target.value)} />

      {AssistantName && <button className="w-[200px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition duration-200 rounded-2xl" onClick={() => navigate('/')}>Create your assistant</button>}
    </div>
  )
}
