import { useEffect, useState } from "react";
import { BookContext } from "./BookContext";
import { addDoc,getDoc, doc, collection, updateDoc, arrayRemove, arrayUnion, onSnapshot, deleteDoc} from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    
    const addBook = async (bookData) => {
      try {
        // Agregar el libro a la colección de libros y obtener la referencia
        const docRef = await addDoc(collection(db, "books"), bookData);
    
        // Obtener el ID asignado al documento recién agregado
        const nuevoId = docRef.id;
    
        // Actualizar el libro recién agregado con el ID obtenido
        await updateDoc(docRef, { id: nuevoId });
    
        Swal.fire({
          title: 'success',
          text: 'Libro guardado correctamente',
          icon: 'success',
        });
    
        return true;
      } catch (error) {
        console.error('Error al agregar el libro:', error);
        Swal.fire({
          title: 'ERROR',
          text: 'Error al agregar el libro. Consulta la consola para obtener más detalles.',
          icon: 'error',
        });
        return false;
      }
    };

    const loadAllBooks = () => {
        const unsubscribe = onSnapshot(collection(db, "books"), (snapshot) => {
            const booksData = snapshot.docs.map((doc) => ({ ...doc.data() }));
            setBooks(booksData);
        });

        return unsubscribe;
    };

    const togglePrestamoLibro = async (idLibro, idUsuario) => {
        try {
            // Obtener el documento del libro
            const libroRef = doc(db, 'books', idLibro);
            const libroDoc = await getDoc(libroRef);

            if (libroDoc.exists()) {
                const libroData = libroDoc.data();

                // Verificar el estado actual del libro
                if (libroData.availability) {
                    // Si el libro está disponible, prestarlo
                    await updateDoc(libroRef, { availability: false });
                    await updateDoc(doc(db, 'users', idUsuario), { librosPrestados: arrayUnion(idLibro) });
                    console.log('Libro prestado exitosamente.');
                } else {
                    // Si el libro no está disponible, devolverlo
                    await updateDoc(libroRef, { availability: true });
                    await updateDoc(doc(db, 'users', idUsuario), { librosPrestados: arrayRemove(idLibro) });
                    await updateDoc(doc(db, 'users', idUsuario), { librosDevueltos: arrayUnion(idLibro) });
                    console.log('Libro devuelto exitosamente.');
                }

                return true;
            } else {
                console.log('Libro no encontrado.');
                return false;
            }
        } catch (error) {
            console.error('Error al procesar el préstamo/devolución del libro:', error);
            return false;
        }
    };
    const obtenerLibroPorId = async (idLibro) => {
        const libroRef = doc(db, 'books', idLibro);
  
        try {
          const libroDoc = await getDoc(libroRef);
  
          if (libroDoc.exists()) {
            const libroData = libroDoc.data();
            return libroData
          } else {
            console.log('Libro no encontrado.');
          }
        } catch (error) {
          console.error('Error al obtener el libro:', error);
        }
      };
    const updateBook = async (id, updatedData)=>{
        const userDocRef =  doc(collection(db, 'books'), id);
        updateDoc(userDocRef, updatedData)
      .then(() => {
      Swal.fire({
        title: "success",
        text: "Cambios Guardados",
        icon: "success"
      });
      })
      .catch((error) => {
      Swal.fire({
        title: "error",
        text: "Error al guardar verifique todo",
        icon: "error"
      });
    });
      }
      const eliminarLibro = async (idLibro) => {
   
        try {
          const libroRef = doc(db, 'books', idLibro);
          // Eliminar el libro de la colección de libros
          await deleteDoc(libroRef);
      
          Swal.fire({
            title:'SUCCESS',
            text:'Libro eliminado correctamente',
            icon:'success'
          })
        } catch (error) {
            Swal.fire({
                title:'error',
                text:'Libro no se ha podido eliminar',
                icon:'error'
              })
        }
      };
      
    useEffect(() => {
        const unsubscribe = loadAllBooks();

        return () => {
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

    return (
        <BookContext.Provider value={{ addBook, loadAllBooks, books, togglePrestamoLibro, obtenerLibroPorId, updateBook, eliminarLibro }}>
            {children}
        </BookContext.Provider>
    );
};
