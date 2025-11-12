/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import inputvoice from "../assets/inputvoice.gif";
import GoogleListenAnimation from "../components/GoogleListenAnimation.jsx";

const Home = () => {
  const { user, logout, getGeminiResponse } = useContext(AuthContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  const recognitionRef = useRef(null);
  const fallbackIntervalRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const hasGreetedRef = useRef(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham, setHam] = useState(false);

  // Start recognition safely (shared)
  const safeStartRecognition = async () => {
    if (!user) return;
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (isRecognizingRef.current || isSpeakingRef.current) return;

    try {
      recognition.start();
      // onstart handler will set isRecognizingRef.current true
      console.log("safeStartRecognition: start requested");
    } catch (err) {
      // InvalidStateError commonly thrown if already starting/started
      console.log("safeStartRecognition start error:", err?.name || err?.message || err);
      // try again shortly
      setTimeout(() => {
        if (!isRecognizingRef.current && !isSpeakingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            console.log("retry start failed:", e?.name || e?.message || e);
          }
        }
      }, 500);
    }
  };

  // Stop recognition safely
  const safeStopRecognition = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    try {
      recognition.stop();
    } catch (err) {
      console.log("safeStopRecognition error:", err);
    } finally {
      isRecognizingRef.current = false;
      setListening(false);
    }
  };

  const AssistantSpeak = (text) => {
    if (!text) return;
    const synth = synthRef.current;
    // Stop recognition so TTS isn't picked up
    safeStopRecognition();

    synth.cancel(); // stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    isSpeakingRef.current = true;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      // small delay then start recognition again
      setTimeout(() => {
        safeStartRecognition();
      }, 300);
    };

    utterance.onerror = (err) => {
      console.warn("Speech synthesis error:", err);
      isSpeakingRef.current = false;
      setTimeout(() => {
        safeStartRecognition();
      }, 300);
    };

    // Only speak if allowed
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const voices = speechSynthesis.getVoices();
    if (voices.length) utterance.voice = voices[0];

    synth.speak(utterance);
  };

  // Handle assistant commands
  const handleCommand = (data) => {
    if (!data) return;
    const { type, response, userInput } = data;

    // Speak once only
    if (response) AssistantSpeak(response);

    switch (type) {
      case "get_date":
      case "get_time":
      case "get_day":
      case "get_month":
      case "general":
      case "project_summary":
        // already spoken
        break;

      case "google_search": {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        break;
      }

      case "youtube_search":
      case "youtube_play": {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        break;
      }

      case "instagram_open":
        window.open("https://www.instagram.com", "_blank");
        break;

      case "facebook_open":
        window.open("https://www.facebook.com", "_blank");
        break;

      case "linkedin_open":
        window.open("https://www.linkedin.com/feed/", "_blank");
        break;

      case "twitter_open":
        window.open("https://x.com/home", "_blank");
        break;

      case "weather_show": {
        const query = encodeURIComponent(userInput || "weather near me");
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        break;
      }

      case "calculator_open":
        window.open("https://www.google.com/search?q=online+calculator", "_blank");
        break;

      default:
        AssistantSpeak("Sorry, I didn't understand that command.");
        break;
    }
  };

  // Initialize SpeechRecognition and handlers
  const startAssistant = () => {
    if (!user) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported in this browser.");
      return () => { };
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      console.log("recognition started");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("recognition ended");
      isRecognizingRef.current = false;
      setListening(false);
      // if not speaking, try to restart soon
      if (!isSpeakingRef.current) {
        setTimeout(() => {
          safeStartRecognition();
        }, 500);
      }
    };

    recognition.onerror = (event) => {
      console.warn("recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);

      // Ignore transient network or abort errors
      if (["aborted", "network", "no-speech"].includes(event.error)) return;

      // Retry others after a short delay
      setTimeout(() => {
        safeStartRecognition();
      }, 800);
    };

    recognition.onresult = async (e) => {
      const last = e.results[e.results.length - 1];
      const transcript = (last[0] && last[0].transcript) ? last[0].transcript.trim() : '';
      console.log("speech result:", transcript);

      if (!transcript) return;

      // Listen for assistant name (case-insensitive)
      if (user?.assistantName && transcript.toLowerCase().includes(user.assistantName.toLowerCase())) {
        // stop recognition so we don't get more results while handling
        try {
          setAiText("");
          setUserText(transcript);
          recognition.stop();
        } catch (err) {
          console.log("error stopping recognition before handling:", err);
        }
        isRecognizingRef.current = false;
        setListening(false);

        try {
          const data = await getGeminiResponse(transcript);
          handleCommand(data);
          setAiText(data.response);
          setUserText("");
        } catch (err) {
          console.error("Error fetching Gemini response:", err);
          AssistantSpeak("Sorry, something went wrong while processing that.");
        }
      }
    };

    // small fallback to ensure recognition is running
    fallbackIntervalRef.current = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeStartRecognition();
      }
    }, 2000);

    // start initially
    setTimeout(() => safeStartRecognition(), 300);

    if(!hasGreetedRef.current){
      const greetings = new SpeechSynthesisUtterance(`Hello ${user.name}, what can i help you`);
      greetings.lang = "hi-IN";
      window.speechSynthesis.speak(greetings);
      hasGreetedRef.current = true;
    }

    // cleanup
    return () => {
      try {
        if (recognition) recognition.onresult = recognition.onstart = recognition.onend = recognition.onerror = null;
        safeStopRecognition();
      } catch (e) { /* ignore */ }
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
    };
  };

  useEffect(() => {
    let cleanupFn = null;
    const init = async () => {
      try {
        if (user) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          cleanupFn = startAssistant();
        }
      } catch (err) {
        console.error("Mic permission denied or error:", err);
      }
    };
    init();

    // cleanup on unmount
    return () => {
      if (cleanupFn && typeof cleanupFn === "function") cleanupFn();
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-black to-[#070731] flex flex-col items-center justify-center px-4 py-6 relative">
      {/* buttons for update and logout with responsiveness according to the screen sizes */}
      <div className="md:absolute md:top-4 top-10 right-4 flex items-center gap-6 md:z-10 mb-10 md:mb-0">
        {/* Hamburger Icon for small screens */}
        <GiHamburgerMenu
          className="absolute top-8 right-8 text-white text-4xl md:hidden cursor-pointer"
          onClick={() => setHam(true)}
        />

        {/* Mobile Menu - show only when ham is true */}
        {ham && (
          <div className="absolute top-0 left-0 w-full h-full bg-[#00000090] backdrop-blur-lg overflow-hidden p-10 flex flex-col gap-8 z-50">
            <RxCross2
              className="text-white text-4xl md:hidden cursor-pointer self-end"
              onClick={() => setHam(false)}
            />

            <div className="flex flex-col gap-4 mt-6">
              <button
                className="w-full bg-red-800 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                onClick={logout}
              >
                Logout
              </button>
              <button
                className="w-full bg-green-800 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                onClick={() => {
                  setHam(false)
                  navigate('/customized')
                }}
              >
                Update Assistant
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <h1 className="text-gray-100 border-b-2 text-xl pb-1">History</h1>
              <div className="w-full h-[60%] mt-4 flex flex-col gap-3">
                {user.chatHistory && user.chatHistory.length > 0 ? (
                  user.chatHistory.map((his, i) => (
                    <span key={i} className="text-white text-sm truncate">
                      {his}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No chat history</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Buttons for medium and large screens */}
        <button
          className="w-[120px] md:w-[150px] bg-red-800 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 hidden md:block"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="w-[120px] md:w-[150px] bg-green-800 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 text-sm p-1 hidden md:block"
          onClick={() => navigate('/customized')}
        >
          Update Assistant
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-16 gap-6 text-center md:text-left">
        {/* Assistant Image */}
        <div className="w-[250px] sm:w-[280px] md:w-[300px] h-[320px] sm:h-[340px] md:h-[350px] bg-[#02020a] border-2 border-blue-300 rounded-2xl overflow-hidden hover:shadow-md cursor-pointer">
          <img
            src={user?.assistantImage}
            alt={user?.assistantName}
            className="w-full h-full object-fill rounded-2xl p-1"
          />
        </div>

        {/* Assistant Info */}
        <div className="flex flex-col items-center md:items-start justify-center max-w-[90%] md:max-w-md gap-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-serif leading-snug">
            Hello, I'm{' '}
            <span className="font-semibold text-gray-200">
              {user?.assistantName}
            </span>
            <br />
            <span className="text-red-400 text-base sm:text-lg md:text-2xl font-light font-serif">
              your AI-powered Virtual Assistant
            </span>
          </h1>

          {/* GIFs */}
          {aiText ? (
            <img
              src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGF0emd3NWF3Z2txdTdsbHNyb2Y0Znhzazl2MnVubXZzeXRpN2lsMCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9cw/UZZF0KnGHpJvnQumU6/giphy.gif"
              className="w-[200px] h-[100px] rounded-md"
              alt="Speaking animation"
            />
          ) : (
            <div><GoogleListenAnimation /></div>
          )}

          {/* Instruction Text */}
          <p className="text-white text-xs sm:text-sm border border-white p-3 rounded-2xl leading-relaxed bg-white/5">
            <span className="italic text-orange-300">
              {userText
                ? userText
                : 'Give your voice command starting with my AssistantName!"'}
            </span>
          </p>

          {/* AI Response */}
          <h1 className="text-white mt-2 text-sm sm:text-base md:text-lg">
            {aiText ? aiText : 'waiting for your command..'}
          </h1>
        </div>
      </div>
    </div>

  );
}

export default Home;
