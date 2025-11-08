import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Customized from './pages/Customized';
import { AuthContext } from './context/AuthContext';
import AsistantName from './pages/AsistantName';

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <Routes>
        {/* Home route — only if assistant setup is complete */}
        <Route
          path="/"
          element={
            user?.assistantImage && user?.assistantName
              ? <Home />
              : <Navigate to="/customized" />
          }
        />

        {/* Signup — only for guests */}
        <Route
          path="/signup"
          element={
            !user
              ? <SignUp />
              : <Navigate to={user.assistantImage && user.assistantName ? "/" : "/customized"} />
          }
        />

        {/* Signin — only for guests */}
        <Route
          path="/signin"
          element={
            !user
              ? <SignIn />
              : <Navigate to={user.assistantImage && user.assistantName ? "/" : "/customized"} />
          }
        />

        {/* Customized — only for logged-in users who haven’t finished setup */}
        <Route
          path="/customized"
          element={
            user
              ? <Customized />
              : <Navigate to="/signup" />
          }
        />

        {/* Assistant name setup page */}
        <Route
          path="/assistant-name"
          element={
            user
              ? <AsistantName />
              : <Navigate to="/signup" />
          }
        />
      </Routes>
    </div>

  )
}

export default App;