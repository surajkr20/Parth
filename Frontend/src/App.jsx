import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Customized from './pages/Customized';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={(user?.assistantImage && user?.assistantName) ? <Home /> : <Navigate to={"/customized"} />} />
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to={'/'} />} />
        <Route path='/signin' element={!user ? <SignIn /> : <Navigate to={'/'} />} />
        <Route path='/customized' element={user ? <Customized /> : <Navigate to={'/signin'} />} />
      </Routes>
    </div>
  )
}

export default App;