import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLoginMutation, useRegisterMutation } from './store/api/authEndpoints';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from './public/publicLayout';
import Home from './public/Home';

function App() {
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const handleLogin = async () => {
    try {
      const response = await login({ username: 'testuser', password: 'password123' }).unwrap();
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  useEffect(() => {
    handleLogin();
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />} >
            <Route index element={<Home />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
