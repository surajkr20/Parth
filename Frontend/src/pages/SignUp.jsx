import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import videoBg from "../../public/signin_bg.mp4";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const {signup, loading} = useContext(AuthContext);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      if (!video.paused) {
        video.play().catch(() => { });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // serving data from context
    signup({name, email, password});

    // reset form
    setEmail("");
    setName("");
    setPassword("");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🔹 Background Video */}
      <video
        ref={videoRef}
        src={videoBg}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-60 -z-20"
      />

      {/* 🔹 Enable Sound Button */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-xl text-sm font-medium transition-all border border-white/20"
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

      {/* 🔹 Sign Up Card */}
      <div className="relative bg-[#101020]/80 backdrop-blur-lg border border-white/10 shadow-2xl p-10 rounded-2xl w-[90%] max-w-md z-10 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Create your account
        </h2>

        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              value={name}
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md bg-white/10 px-3 py-2 text-base text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email address
            </label>
            <input
              value={email}
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md bg-white/10 px-3 py-2 text-base text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              value={password}
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md bg-white/10 px-3 py-2 text-base text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            {loading ? "Loading.." : "SignUp"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">or continue with</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-gray-700 text-white transition-all">
            <FcGoogle size={20} className="mr-2" /> Google
          </button>
          <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-gray-700 text-white transition-all">
            <FaGithub size={20} className="mr-2" /> GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
