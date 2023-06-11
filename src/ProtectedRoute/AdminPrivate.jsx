import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdminSecure from "../API/useAdminSecure";
import { AuthContext } from "../Provider/AuthProvider";


const AdminPrivate = ({children}) => {
    const {user, loader} = useContext(AuthContext);
    const [admin, isAdminLoading] = useAdminSecure()
    const location = useLocation();
    if(loader || isAdminLoading){
        return <div className="w-1/12 mx-auto pt-60"><span className="loading loading-dots loading-lg  md:w-44"></span></div>
    }
    if(user && admin){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
};

export default AdminPrivate;