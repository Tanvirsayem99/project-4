import { useEffect, useState } from "react";
import useTile from "../../API/useTitle";
import PopularInstructor from "../Popular/PopularInstructor";
import Popular from "../PopularClasses.jsx/Popular";
import Banner from "./Banner";
import Services from "./Services";


const Home = () => {
    useTile('HOME')
    const [theme, setTheme] = useState('')
    const [clicker, setClicker] = useState('')
    const handleTheme = theme =>{
        localStorage.setItem('theme', theme)
        setClicker(theme)
      }
      useEffect(()=>{
        const finalTheme = localStorage.getItem('theme')
        setTheme(finalTheme)
      },[clicker])
  
      document.querySelector("html").setAttribute("data-theme", theme)
    return (
        <div className="relative">
            <div className="border-2  border-orange-600 rounded-2xl  w-20 h-7 top-20 fixed z-10 right-0 md:right-16">
                {
                    theme === "light" && <div onClick={()=>handleTheme('dark')} className="z-10 bg-pink-600 w-5 h-5 rounded-full absolute top-0.5 left-0.5"></div>
                }
                {
                    theme !== "light" && <div onClick={()=>handleTheme('light')} className="bg-pink-600 w-5 h-5 z-10 rounded-full absolute top-0.5  right-0.5"></div>
                }
                {
                    theme === 'light' && <button onClick={()=>handleTheme('dark')} className=" text-sky-500 z-10 absolute right-0 transition duration-150 ease-out">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
       </svg>
                    </button>
                }
                {
                    theme !== 'light' && <button onClick={()=>handleTheme('light')} className="  z-10 text-sky-500 absolute left-0 transition duration-150 ease-out">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
   </svg>
                    </button>
                }
            </div>
            <Banner></Banner>
            <Popular theme={theme}></Popular>
            <PopularInstructor theme={theme}></PopularInstructor>
            <Services theme={theme}></Services>
            
        </div>
    );
};

export default Home;


