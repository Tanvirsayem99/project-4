import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../API/useInstructor";
import { AuthContext } from "../Provider/AuthProvider";


const InstructorPrivate = ({children}) => {
    const {user, loader} = useContext(AuthContext)
    const [insTructor, isInstructorLoading] = useInstructor();
    const location = useLocation();
    if(loader || isInstructorLoading){
        return <div className="w-1/12 mx-auto pt-60"><span className="loading loading-dots loading-lg  md:w-44"></span></div>
    }
    if(user && insTructor){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
};

export default InstructorPrivate;