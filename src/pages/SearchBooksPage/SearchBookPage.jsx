import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import { Card } from '../../components/Cards/Card';
import './styleSearchBook.css'
export const SearchBookPage = () => {
  const { nombre } = useParams();
  const { books } = useContext(BookContext);
  const [booksFiltrados, setBooksFiltrados] = useState([]);

  const filtradoBooks = (books, nombre) => {
    const booksFound = books.filter(book => book.title.toLowerCase().includes(nombre.toLowerCase()));
    setBooksFiltrados(booksFound);
  };

  useEffect(() => {
    if (books) {
      filtradoBooks(books, nombre);
    }

  }, [books,nombre]);


  return (
    <main className='container'>
    <div className='searchBookPage'>
      <h1>Libros Encontrados: {booksFiltrados.length}</h1>
      <div className='list_Books-Contenido'>
        {booksFiltrados.length ? (
          booksFiltrados.map(book => (
            <Card key={book.id} id={book.id} title={book.title} autor={book.autor} year={book.year} availability={book.availability} />
          ))
        ) : (
          <p>No hay libros encontrados.</p>
        )}
      </div>
    </div>
    </main>
  );
};
