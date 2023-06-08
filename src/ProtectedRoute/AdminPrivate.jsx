import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdminSecure from "../API/useAdminSecure";
import { AuthContext } from "../Provider/AuthProvider";


const AdminPrivate = ({children}) => {
    const {user, loader} = useContext(AuthContext);
    const [admin, isAdminLoading] = useAdminSecure()
    const location = useLocation();
    if(loader || isAdminLoading){
        return <p>hello world</p>
    }
    if(user && admin){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
};

export default AdminPrivate;