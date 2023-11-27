import React, { useEffect, useState, useContext } from 'react'
import "./Header.css"
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { UserMenu } from '../menuUser/UserMenu'

export const Header = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const [currentPage, setCurrentPage] = useState('');



    const handleSearchChange = (e)=>{
        setValueSearch(e.target.value)
    }
    const handleSubmitSearch = (e)=>{
        e.preventDefault();
        if(valueSearch){
            navigate(`/search/${valueSearch}`);
            setValueSearch('')
        }
        
    }
    const handlePerfil =(e)=>{
        e.stopPropagation();
        setOpenMenu(!openMenu)
    }
    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setCurrentPage(path);
        
    }, [location])
    console.log(currentPage)
    
  return (

        <header className='header_info'>
        <Link to={'/'} className='header_logo-title'>
            <img className='header_logo' src="/Logo.webp" alt="Logo" />
            <h3 className='header_title'>Biblioteca Web</h3>
        </Link>
            <form onSubmit={handleSubmitSearch} action="" className='form-search'>
                <div className='form-search_group'>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB8UlEQVR4nNVVO2gUURQdFVRQS8FGtAii9goRZMjcu+c+UwQUt7GwUIgK2oj9+v+gTTCie++LAcuIIGhjI9jEzspOxEYshCCoUfG38mafRBd3901iEC9MM3PeOef+3mTZvwzg5nqQPyBkJ8F2BmxHgObmBRO7YmIrWO8L63dha3U+IHsshe6cF3mt0L0gm41Er8B2DWxHQTYqpJeF9Fn7m34F+xOVyIWaLGxfQPZNSE/l+eTKTky9PrVMCjskrB+jidE057Vbq4Lj1EMyZ+bT8JDfkOBej8fU7yQ5ysIZu1ieYb3RFwzW6bKJ5AdTBZybWFv2gvR1KF0PaGtJrOm7RqOxNFUgBFiflMbk+sasW4zs8GvaI6jPs4qBcpythcK2dwUF16FhQjozD4HpUqDfAoLtaQAy25ZU8lqYPLYPQvq+Xp9a3luA7Fy7yXo12T3psbjdt/uCh/PJdaHJwvYZhR/qh99FuklY34SldNTcluRIWA/HuX7rarq7K478INhexowfZVUCrKfnLjl96Ao9GAiDS7DtC4vYeQmC9XwlEWHbA7IXf7pJo+sZsN39/b1eqCTi3NgK4eYIyMaF7Z6QPgCbB+n+PB9fHbO9tCCRpGxJz3Zkd+X/FMEv5Qo/LMAGFiUTkM069vTXyX/GojjvFT8AR18trTMA6QcAAAAASUVORK5CYII="/>
                    <input type="text" value={valueSearch} onChange={handleSearchChange} />
                </div>
                <button className='form-search_btn btn' type="submit">Search</button>
            </form>
            <nav className='header_nav'>
                <ul>
                    <li><Link to={'/registrosPrestamos'} className={currentPage === 'registrosPrestamos' ? 'active' : ''}>Registros de Prestamos</Link></li>
                    <li><Link to={'/devoluciones'} className={currentPage === 'devoluciones' ? 'active' : ''}>Devoluciones</Link></li>
                </ul>
            </nav>
            <div className='header_btnsAuth'>
                        {
                            !user?(
                                <>
                                <button onClick={()=>navigate('/login')} className='header_btnsAuth_btn-login btn'>Login</button>
                                <button onClick={()=>navigate("/register")}  className='header_btnsAuth_btn-register btn' >Register</button>
                                </>
                            ):(
                    <div className='userAuth'>
                        <img width="50" onClick={handlePerfil} height="50" src={user.photoURL} alt="user-male-circle"/>
                         {
                            user.admin&&(
                                <button onClick={()=>navigate('/addBook')} className='btn btn-addLibro'>Add Libro</button>
                            )
                         }       
                        {
                            openMenu&&(
                                <UserMenu firstName={user.firstName}  lastName={user.lastName} email={user.email} image={user.photoURL} setOpenMenu={setOpenMenu}/>
                            )
                        }
                         </div>
                            )
                    }
                        
            </div>
            </header>
  )
}
