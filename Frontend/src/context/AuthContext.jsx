/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// create context
export const AuthContext = createContext();

// create provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const serverUrl = "http://localhost:3000";

    useEffect(() => {
        const fetchAuthenticatedUser = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${serverUrl}/api/user/me`, {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (err) {
                setUser(null);
                const msg =  err.response?.data?.message || "Fetching authenticated data failed";
                setError(msg);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthenticatedUser();
    }, []);

    // 🧩 signup function
    const signup = async (data) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post("http://localhost:3000/api/auth/signup", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setUser(res.data?.user);
            navigate("/customized");
            toast.success("Account created successfully!");
        } catch (err) {
            setUser(null);
            const msg = err.response?.data?.message || "Signup failed!"
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    // 🧩 login function
    const login = async (data) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post("http://localhost:3000/api/auth/login", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setUser(res.data.user);
            navigate("/");
            toast.success("Logged in successfully!");
        } catch (err) {
            setUser(null);
            const msg = err.response?.data?.message || "Login failed!";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    // 🧩 logout function
    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
            toast.success("Logged out");
            navigate("/signin");
        } catch (err) {
            setUser(null);
            const msg = err.response?.data?.message || "logout failed!";
            setError(msg);
            toast.error(msg);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout, error, serverUrl, frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}