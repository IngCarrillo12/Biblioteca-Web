import React, { useContext, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Register } from './components/Login-register/Register';
import { HomePage } from './pages/HomePage/HomePage';
import { Login } from './components/Login-register/Login';
import { AddBook } from './components/AddBook/AddBook';
import RegistroPrestamosPage from './pages/RegistroPrestamos/RegistroPrestamosPage';
import { AuthContext } from './context/AuthContext';
import { DevolucionesPage } from './pages/DevolucionesPage/DevolucionesPage';
import { SearchBookPage } from './pages/SearchBooksPage/SearchBookPage';
import { BookPage } from './pages/BookPage/BookPage';

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path='/search/:nombre' element={<SearchBookPage />} />
        <Route
          path="/addBook"
          element={
            user?.admin ? <AddBook /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/registrosPrestamos"
          element={
            user ? <RegistroPrestamosPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/devoluciones"
          element={
            user ? <DevolucionesPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/viewBook/:id"
          element={
            <BookPage />
          }
        />
      </Routes>
    </Suspense>
  );
};


