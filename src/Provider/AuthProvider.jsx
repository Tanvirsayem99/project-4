import { useState } from "react";
import { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.config";
import { useEffect } from "react";
import axios from "axios";

export  const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const auth = getAuth(app);

    const createUser = (email, password) =>{
        setLoader(true)
        return createUserWithEmailAndPassword (auth, email, password);
    }
    const logOut = () =>{
        setLoader(true)
        localStorage.removeItem('access-token')
        return signOut(auth);
    }
    const loginUser = (email, password) =>{
        setLoader(true)
        return signInWithEmailAndPassword (email, password)
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (loggedUser)=>{
            setUser(loggedUser)
            if(loggedUser){
                axios.post(`http://localhost:5000/jwt`, {email: loggedUser.email})
                .then(data =>{
                    console.log(data.data)
                    localStorage.setItem('access-token', data.data)
                    setLoader(false)
                })
            }
            else{
                localStorage.removeItem('access-token')
            }
            
        })
        return () =>{
            unSubscribe();
        }
    },[])
    const updateUser =( name, url) =>{
        return updateProfile (auth.currentUser,{
            displayName : name, 
            photoURL : url
        })
    }
    const googleSignIn = () =>{
        setLoader(true)
        return signInWithPopup(auth, provider);
    }
  const authInfo = {
        user,
        loader,
        createUser,
        loginUser,
        updateUser,
        googleSignIn,
        logOut
  }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;