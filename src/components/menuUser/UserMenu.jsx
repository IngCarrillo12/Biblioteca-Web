// UserMenu.jsx
import React, { useContext, useEffect, useRef } from 'react';
import './styleUserMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const UserMenu = ({ firstName, lastName, email, image, setOpenMenu,a }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const { logout } = useContext(AuthContext)
  const logOut = () => {
    logout();
    setOpenMenu(false);
    navigate('/');
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };
  useEffect(() => {
   
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenMenu]);

  return (
    <div className='userMenu' ref={modalRef}>
      <div className='userMenu_group'>
        <img width={'38px'} src={image} alt='foto perfil' />
        <h3 className='userMenu_name'>{firstName} {lastName}</h3>
      </div>
      <h4 className='userMenu_email'>
        <b>Email:</b>
        <br/> {email}
      </h4>
      <Link className='userMenu_linkEditPerfil' to={"/registrosPrestamos"}>
        Libros Prestados
      </Link>
      <button className='btn btn-logout' onClick={logOut}>
        Logout
      </button>
    </div>
  );
};
