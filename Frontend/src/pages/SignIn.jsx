import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import videoBg from "../../public/signin_bg.mp4";

const SignIn = () => {
  const videoRef = useRef(null);
   const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      if (!video.paused) {
        video.play().catch(() => {});
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        ref={videoRef}
        src={videoBg}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
      />

      {/* 🔊 Sound Toggle */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white px-4 py-2 rounded-xl border border-white/30 shadow-md cursor-pointer z-10"
      >
        {isMuted ? (
          <>
            <span role="img" aria-label="sound-off">🔇</span>
            <span>Enable Sound</span>
          </>
        ) : (
          <>
            <span role="img" aria-label="sound-on">🔊</span>
            <span>Mute Sound</span>
          </>
        )}
      </button>

      {/* 🪩 Form Container */}
      <div className="relative z-10 bg-[#0e0e1a]/80 backdrop-blur-lg p-10 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Welcome Back 👋
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-[#1a1a2e] rounded-lg border border-gray-700 text-white hover:bg-[#22223b]">
            <FcGoogle size={20} className="mr-2" /> Google
          </button>
          <button className="flex items-center px-4 py-2 bg-[#1a1a2e] rounded-lg border border-gray-700 text-white hover:bg-[#22223b]">
            <FaGithub size={20} className="mr-2" /> GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold">
            Create Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
