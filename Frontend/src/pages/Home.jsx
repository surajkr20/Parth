import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#070731] flex flex-col items-center justify-center px-6 text-center">
      <div className='absolute flex md:flex-col to top-[40px] items-center md:right-6 gap-4'>
        <button className="md:w-[200px] w-[120px] bg-red-800 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200" onClick={logout}>Logout</button>
        <button className="md:w-[200px] w-[120px] bg-green-800 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200" onClick={() => navigate("/customized")}>Update Assistant</button>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Assistant Image */}
        <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] border border-white rounded-2xl p-2 overflow-hidden shadow-lg">
          <img
            src={user?.assistantImage}
            alt={user?.assistantName}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Assistant Info */}
        <div className="flex flex-col gap-4 items-center justify-center max-w-md">
          <h1 className="text-white text-3xl md:text-4xl font-serif leading-snug">
            Hii, I'm{" "}
            <span className="text-orange-400 font-semibold text-4xl md:text-5xl">
              {user?.assistantName}
            </span>
            <br />
            <span className="text-red-400 text-xl md:text-2xl font-light font-mono">
              your AI-powered Virtual Assistant
            </span>
          </h1>

          <p className="text-white text-sm md:text-base border border-white p-3 rounded-2xl leading-relaxed bg-white/5">
            Give me a command (voice or text) starting with my name.
            <br />
            <span className="italic text-orange-300">
              e.g., Parth – search "Aaj Ki Raat" song on YouTube
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home;