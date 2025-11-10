/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout, getGeminiResponse } = useContext(AuthContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  const recognitionRef = useRef(null);
  const fallbackIntervalRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Start recognition safely (shared)
  const safeStartRecognition = async () => {
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
          recognition.stop();
        } catch (err) {
          console.log("error stopping recognition before handling:", err);
        }
        isRecognizingRef.current = false;
        setListening(false);

        try {
          const data = await getGeminiResponse(transcript);
          console.log("Gemini response:", data);
          handleCommand(data);
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
        await navigator.mediaDevices.getUserMedia({ audio: true });
        cleanupFn = startAssistant();
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
  );
}

export default Home;
