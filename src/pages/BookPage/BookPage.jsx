import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BookContext } from '../../context/BookContext'
import { useNavigate, useParams } from 'react-router-dom'

export const BookPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {obtenerLibroPorId, updateBook, eliminarLibro} = useContext(BookContext)
    const {user} = useContext(AuthContext)
    const [bookUpdate, setBookUpdate] = useState()
    const [edit, setEdit] =useState(false)
    const regexAno = /^(198\d|199\d|200[0-3])$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
      setBookUpdate((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }

  const handleEdit = async() => {
    if (edit) {
      if(user.admin){
            const updatedData = {
                title: bookUpdate.title,
                description: bookUpdate.description,
                year: bookUpdate.year,
                autor:bookUpdate.autor,
                genero: bookUpdate.genero,
            }
            await updateBook(id, updatedData)
    }

    
  };
  setEdit(!edit);
}
const loadBookData = async () => {
    const foundLibro = await obtenerLibroPorId(id);
    setBookUpdate(foundLibro);
  };
  const handleDelete = async()=>{
    await eliminarLibro(id)
    navigate('/')
  }
  useEffect(() => {
    if (user && id) {
      loadBookData();
    }
  }, [user, id]);

  
    
    return (
      <div className='container'>
        <div className='container-addBook'>
          <div className='addBook'>
            {
                bookUpdate?(
                    <>
        <form className='addBook_form' action="" >
            <div className='container_form_group'>
            <div  className='form_group form_group_addBook'>
                <label htmlFor="">Title:</label>
                <input className='input' onChange={handleChange} disabled={!edit} type="text" name='title' placeholder='El principito' value={bookUpdate.title} required />
            </div>
            <div className='form_group form_group_addBook'>
                <label htmlFor="autor">Autor:</label>
                <input className='input' onChange={handleChange} disabled={!edit} type="text" name='autor' placeholder='Adriana Serje' value={bookUpdate.autor} required />
            </div>
            </div>
            <div className='container_form_group'>
            <div className='form_group form_group_addBook'>
                <label htmlFor="year">Year:</label>
                <input className='input' onChange={handleChange} disabled={!edit} type="number" name='year' placeholder='2010' value={bookUpdate.year} required />
            </div>
            <div className='form_group form_group_addBook'>
                <label htmlFor="genero">Genero:</label>
                <input className='input' onChange={handleChange} disabled={!edit} type="text" name='genero' placeholder='novela corta' value={bookUpdate.genero} required />
            </div>
            </div>
            <div className='form_group form_group_addBook description'>
                <label htmlFor="description">Description:</label>
                <textarea cols={10} rows={10} className='input textArea-description' onChange={handleChange} disabled={!edit} type="text" name='description' value={bookUpdate.description} required />
            </div>
          
        </form>
          {
          user?.admin && (
            <>
            <button onClick={handleEdit} className='btn btn-editarPerfil'>
              {edit ? 'Guardar Cambios' : 'Editar'}
            </button>
            <button  onClick={handleDelete} className='btn btn-editarPerfil'>Eliminar
          </button>
          </>
          )
        }
            </>    
            
            
                ):(
                    <div>Cargando...</div>
                )
            }
          
              </div>
              
          </div>
      </div>
    )
}
