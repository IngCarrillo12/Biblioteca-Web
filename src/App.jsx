import React from 'react';
import './App.css'

import { AuthProvider } from './context/AuthProvider'
import { AppRouter } from './AppRouter'
import { BookProvider } from './context/BookProvider'
function App() {

  return (
    <>
     <AuthProvider>
      <BookProvider>
      <AppRouter/>
      </BookProvider>
     </AuthProvider>
    </>
  )
}

export default App
