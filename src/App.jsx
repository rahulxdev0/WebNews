import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLoginMutation, useRegisterMutation } from './store/api/authEndpoints';

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
      <h1 className='text-4xl font-bold bg-red-200'>Hello World</h1>
    </>
  )
}

export default App;
