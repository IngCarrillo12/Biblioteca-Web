import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { Card } from '../../components/Cards/Card';
import { AuthContext } from '../../context/AuthContext'
import './styleRegistroPrestamos.css'

const RegistroPrestamosPage = () => {
  const { books } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const [librosPrestados, setLibrosPrestados] = useState([]);

  const filtradoLibros = async (books, user) => {
    if (user && books) {
      const LibrosPrestados = await books.filter(book => user.librosPrestados.includes(book.id));
      setLibrosPrestados(LibrosPrestados);
    }
  };


  useEffect(() => {
    filtradoLibros(books, user); // Se deben pasar ambos argumentos
  }, [books, user,]); // Se deben listar ambas dependencias

  return (
    <main className='container'>
    <div className='registro-prestamos'>
      <h1>Libros Prestados</h1>
      <div className='list_Books-Contenido'>
        {librosPrestados.length ? (
          librosPrestados.map(book => (
            <Card key={book.id} id={book.id} title={book.title} autor={book.autor} year={book.year} availability={book.availability} />
          ))
        ) : (
          <p>No hay libros prestados.</p>
        )}
      </div>
    </div>
    </main>
  );
};

export default RegistroPrestamosPage;
