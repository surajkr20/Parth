import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Customized from './pages/Customized';
import { AuthContext } from './context/AuthContext';
import { AsistantName } from './pages/AsistantName';

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={(user?.assistantImage && user?.assistantName) ? <Home /> : <Navigate to={"/customized"} />} />
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to={'/customized'} />} />
        <Route path='/signin' element={!user ? <SignIn /> : <Navigate to={'/'} />} />
        <Route path='/customized' element={user ? <Customized /> : <Navigate to={'/signup'} />} />
        <Route path='/assistant-name' element={user ? <AsistantName /> : <Navigate to={'/signup'} />} />
      </Routes>
    </div>
  )
}

export default App;