import React, { useContext, useEffect, useState } from 'react';
import { ListCardsBooks } from '../../components/Cards/ListCardsBooks';
import { BookContext } from '../../context/BookContext';
import './styleHome.css'
export const HomePage = () => {
  const { books } = useContext(BookContext);
  const [filtradoGenero, setFiltradoGenero] = useState('');
  const handleChangeSelect = (e) => {
    const genero = e.target.value.toLowerCase();
    setFiltradoGenero(genero)
  };
  return (
    <main className='container'>
    <div className='homePage'>
      <section className='homePage_about'>
        <div className='homePage_about_contenido'>
          <h1>¡Bienvenido a nuestra biblioteca web, donde la magia de los libros cobra vida!</h1>
          <p>Explora mundos infinitos, sumérgete en emocionantes aventuras y descubre tesoros literarios en nuestra biblioteca en línea. Desde clásicos atemporales hasta las últimas novedades, tenemos algo para cada lector ávido. </p>
          <button className='btn btn-prestarLibro'>Prestar Libro</button>
        </div>
        <div className='homePage_about_img'>
          <img src="/fondo-about.png" alt="" />
        </div>
      </section>
    <section className='homePage_listBooks'>
      
      {books? (
        <>
         <div className='listBooks_header'>
           <h3>Libros</h3>
        
        <div className='listBooks_header-select'>
            <label htmlFor="generoFilter">Filtrar por Género: </label>
            <select onChange={handleChangeSelect} value={filtradoGenero}>
              <option value="todos">Todos</option>
              {books.map((book) => (
                <option key={book.genero} value={book.genero}>
                  {book.genero}
                </option>
              ))}
            </select>
            </div>
            </div>
          <ListCardsBooks data={books} genero={filtradoGenero} />
  </>

      ) : (
        <div>Cargando...</div>
      )}
    </section>
    </div>
    </main>
  );
};
