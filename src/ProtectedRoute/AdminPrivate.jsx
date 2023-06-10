import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdminSecure from "../API/useAdminSecure";
import { AuthContext } from "../Provider/AuthProvider";


const AdminPrivate = ({children}) => {
    const {user, loader} = useContext(AuthContext);
    const [admin, isAdminLoading] = useAdminSecure()
    const location = useLocation();
    if(loader || isAdminLoading){
        return <span className="loading loading-dots loading-lg text-center absolute left-2/4 top-52  md:w-44   mx-auto"></span>
    }
    if(user && admin){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
};

export default AdminPrivate;