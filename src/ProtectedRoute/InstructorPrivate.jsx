import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../API/useInstructor";
import { AuthContext } from "../Provider/AuthProvider";


const InstructorPrivate = ({children}) => {
    const {user, loader} = useContext(AuthContext)
    const [insTructor, isInstructorLoading] = useInstructor();
    const location = useLocation();
    if(loader || isInstructorLoading){
        return <span className="loading loading-dots loading-lg text-center absolute left-2/4 top-52  md:w-44   mx-auto"></span>
    }
    if(user && insTructor){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
};

export default InstructorPrivate;