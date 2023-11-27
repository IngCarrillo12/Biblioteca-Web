import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styleAddBook.css'
import { BookContext } from "../../context/BookContext"
export const AddBook = () => {
    const { addBook } = useContext(BookContext)
    const navigate = useNavigate()
    const [book, setBook] = useState({
        title:'',
        autor:'',
        description:'',
        availability: true,
        year:'',
        genero:''
    })
    const handleChange = (e)=>{
        const {name, value} = e.target
        setBook({
            ...book,
            [name]:value,
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
        const response = await addBook(book)
        if(response)navigate('/')
        } catch (error) {
            throw error
        }
        
    }
  return (
    <div className='container'>
        <div className='container-addBook'>
        <div className='addBook'>
        <h1>Add Libro</h1>
        <form className='addBook_form' action="" onSubmit={handleSubmit}>
            <div className='container_form_group'>
            <div  className='form_group form_group_addBook'>
                <label htmlFor="">Title:</label>
                <input className='input' onChange={handleChange} type="text" name='title' placeholder='El principito' required />
            </div>
            <div className='form_group form_group_addBook'>
                <label htmlFor="autor">Autor:</label>
                <input className='input' onChange={handleChange} type="text" name='autor' placeholder='Adriana Serje' required />
            </div>
            </div>
            <div className='container_form_group'>
            <div className='form_group form_group_addBook'>
                <label htmlFor="year">Year:</label>
                <input className='input' onChange={handleChange} type="number" name='year' placeholder='2010' required />
            </div>
            <div className='form_group form_group_addBook'>
                <label htmlFor="genero">Genero:</label>
                <input className='input' onChange={handleChange} type="text" name='genero' placeholder='novela corta' required />
            </div>
            </div>
            <div className='form_group form_group_addBook description'>
                <label htmlFor="description">Description:</label>
                <textarea cols={10} rows={10} className='input' onChange={handleChange} type="text" name='description' required />
            </div>
            <button className='btn btn-addBook' type='submit'>Add Libro</button>
        </form>
    </div>
    </div>
    </div>
  )
}
