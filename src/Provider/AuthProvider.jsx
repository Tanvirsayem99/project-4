import { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";


const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
 
    const [user, setUser] = useState('')
    const [loader, setLoader] = useState(true)
    

const provider = new GoogleAuthProvider();

    const createEmail = (email, password) =>{
        setLoader(true)
        return createUserWithEmailAndPassword (auth, email, password);
    }
    const loginUser = (email, password) =>{
        setLoader(true)
        return signInWithEmailAndPassword (auth, email, password)
    }
    const logOut = () =>{
        setLoader(true)
        localStorage.removeItem('access-token')
        return signOut(auth);
    }
    const googleSignIn = () =>{
        return signInWithPopup(auth, provider)
    }
    const updateUser =( name, url) =>{
        return updateProfile (auth.currentUser,{
            displayName : name, 
            photoURL : url
        })
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (loaggedUser) =>{
            
            setUser(loaggedUser)
            if(loaggedUser){
                axios.post('http://localhost:5000/jwt', {email: loaggedUser.email})
                .then(data =>{
                    localStorage.setItem('access-token', data.data)
                    setLoader(false)
                })
            }
            else{
                localStorage.removeItem('access-token')
            }
        })
        return () =>{
            unSubscribe()
        }
    },[])

    const authInfo ={
        user,
        createEmail,
        logOut,
        loginUser,
        loader,
        setLoader,
        googleSignIn,
        updateUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;