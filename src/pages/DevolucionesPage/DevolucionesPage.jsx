import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../../context/BookContext'
import { AuthContext } from '../../context/AuthContext'
import { Card } from '../../components/Cards/Card'
import './styleDevoluciones.css'

export const DevolucionesPage = () => {
    const {books} = useContext(BookContext)
    const {user} = useContext(AuthContext)
    const [booksFiltrados, setBooksFiltrados] = useState([])
    const filterBook = async(books,user)=>{
        if (user && books) {
        const filtrado = await books.filter(book=>user.librosDevueltos.includes(book.id))
        setBooksFiltrados(filtrado)
        }
    }
    useEffect(() => {
     filterBook(books,user)
    }, [books,user])
  return (
    <main className='container'>
    <div className='devolucionesPage'>
    <h1>Historial de devoluciones</h1>
    <div className='list_Books-Contenido'>
        {
            booksFiltrados?(
                books.map(book=>{
                   return(<Card key={book.id} title={book.title} autor={book.autor} year={book.year} id={book.id} availability={book.availability} btnActive={false}/>
                    ) 
                })
            ):(
                <div>Cargando...</div>
            )
        }
    </div>
    </div>
    </main>
  )
}
