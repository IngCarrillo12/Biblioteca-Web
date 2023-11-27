import React, {useContext, useEffect, useState} from 'react'
import { Card } from './Card'
import './styleCards.css'

export const ListCardsBooks = ({data, genero}) => {
  const [books, setbooks] = useState([])
  const filtrar = ()=>{
    if(genero!=='todos'){
      const filtrado = data.filter(book=>book.genero.toLowerCase()===genero.toLowerCase())
      setbooks(filtrado)
    }else{
      setbooks(data)
    }
    if(!genero){
      setbooks(data)
    }
  }
 useEffect(() => {
    setbooks(data)
    filtrar()  
 }, [data, genero])

  return (
    <div className='list_Books-Contenido'>
        {
          books.map(book=><Card key={book.id} id={book.id} title={book.title} autor={book.autor} year={book.year} description={book.description} availability={book.availability} />)
        }
    </div>
  )
}
