import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './styleCards.css'

export const Card = ({ id, title, autor, description, availability, year, btnActive=true }) => {
  const { togglePrestamoLibro } = useContext(BookContext);
  const [isAvailability, setIsAvailability] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePrestar = async (e) => {
    e.preventDefault()
    e.stopPropagation();
    if (user) {
      togglePrestamoLibro(id, user.id);
      setIsAvailability(!isAvailability);
    } else {
      navigate('/login');
      
    }
    
  
  };
  useEffect(() => {
    if (user) {
      setIsAvailability(availability && !user.librosPrestados.includes(id));
    }
  }, [user, availability, id]);

  return (
    <Link to={`/viewBook/${id}`} className='card'>
      <div className='card_contenido'>
        <div className='card_contenido_header'>
          <div className='card_contenido_header_info'>
            <h2>{title}</h2>
            <span>{autor}</span>
            <span>{year}</span>
          </div>
          <div className='card_contenido_header_info-d'>
            <span>{availability ? 'Disponible' : 'No Disponible'}</span>
          </div>
        </div>
      </div>
      
      {
        btnActive&&(
      user? (
        user.librosPrestados.includes(id)?(
          <button className='btn btn-card' onClick={handlePrestar}>
          {isAvailability ? 'Prestar' : 'Devolver'}
        </button>
        ):(
          <>
          {
              !availability?(
              ''
                ):(
                  <button className='btn btn-card' onClick={handlePrestar}>Prestar</button>
                )
          }
          </>
        )
       
      ):(
        availability&&(
        <button className='btn btn-card' onClick={handlePrestar}>Prestar</button>
        )
      )
      )
      }
    </Link>
  );
};
