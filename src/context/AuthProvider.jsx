import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup ,updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import {db, auth} from "../firebase"
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  const validatedError = (error)=>{
    if(error ==="auth/invalid-login-credentials"){
      Swal.fire({
        title: "ERROR",
        text: "Credenciales Invalidas",
        icon: "error"
      });
      return;
    }if(error==="auth/missing-password"){
      Swal.fire({
        title: "ERROR",
        text: "Ingrese su contrasena",
        icon: "error"
      });
      return;
    }if(error==="auth/invalid-email"){
      Swal.fire({
        title: "ERROR",
        text: "Email Invalido",
        icon: "error"
      });
      return;
    }if(error==="auth/missing-email"){
      Swal.fire({
        title: "ERROR",
        text: "Ingrese su correo",
        icon: "error"
      });
      return;
    }else{
      Swal.fire({
        title: "ERROR",
        text: error,
        icon: "error"
      });
      return;
    }
  }
  const signUp = async (userData) => {
    const {email, password, firstName, lastName, photoURL} = userData
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      try {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: photoURL,
        });
        const userId = user.uid;
        const userData = {
          id: userId,
          firstName: firstName,
          lastName : lastName,
          photoURL: photoURL,
          email: email,
          admin:false,
          librosPrestados:[]
        };

        // Guardar los datos en Firestore
        const userDocRef = doc(db, 'users', userId);
        try {
          await setDoc(userDocRef, userData);
          Swal.fire({
            title: "SUCCESS",
            text: "Registrado Correctamente!!",
            icon: "success"
          });
          return true;
        } catch (error) {
          validatedError(error.code)
          return false;
        }
      } catch (error) {
        validatedError(error.code)
        return false;
      }
    } catch (error) {
      validatedError(error.code)
      return false;
    }
  };

  const login = async(email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "SUCCESS",
        text: "Logeado Correctamente",
        icon: "success"
      });
      return true; // Devuelve true si el inicio de sesión es exitoso
    } catch (error) {
      validatedError(error.code)
      return false; // Devuelve false si hay un error durante el inicio de sesión
    }
  
  };
  
  const loginWithGoogle =()=>{
    const  GoogleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, GoogleProvider)
  }
  const getUserById = async (userId) => {
    try {
      const userDocRef = doc(collection(db, "users"), userId);
      const userSnapshot = await getDoc(userDocRef);
  
      if (userSnapshot.exists()) {
        // El usuario existe en Firestore, puedes acceder a los datos con userSnapshot.data()
        const userData = userSnapshot.data();
        // Incluir el ID en el objeto de retorno
        return { id: userSnapshot.id, ...userData };
      } else {
        // El usuario no existe
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };
  const logout = () => signOut(auth);
  const findUser = async(currentUser)=>{
    const user = await getUserById(currentUser.uid)
    setUser(user)
   
}
useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      findUser(currentUser);

      // Suscribirse a los cambios en la colección de usuarios
      const unsubscribeFirestore = onSnapshot(
        collection(db, "users"),
        (snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.id === currentUser.uid) {
              setUser({ id: doc.id, ...doc.data() });
            }
          });
        }
      );

      return () => unsubscribeFirestore();
    } else {
      setUser(null);
    }
  });

  return () => unsubscribeAuth();
}, []);

  return (
    <AuthContext.Provider value={{ signUp, login, user, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};