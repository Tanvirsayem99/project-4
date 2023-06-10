import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const [classes, setClasses] = useState([])
    const [axiosSecure] = useAxiosSecure();
    useEffect(()=>{
        axiosSecure.get(`/history/${user?.email}`)
        .then(res =>{
            setClasses(res.data)
        })
    },[user])
    console.log(classes)
    return (
        <div className="grid gap-5">
            {
                classes.map(singleClass =>(<div key={singleClass._id} className="bg-slate-200 flex p-5 rounded-md  shadow-lg gap-10">
                    <p><b>Name: </b>{singleClass.name}</p>
                    <p><b>Price: </b>{singleClass.price}</p>
                    <p><b>date: </b>{new Date(singleClass.date).getDate()}/{new Date(singleClass.date).getMonth()+1}/{new Date(singleClass.date).getFullYear()}</p>
                    <p><b>Time: </b>{new Date(singleClass.date).getHours() >12 && new Date(singleClass.date).getHours()-12 }:{new Date(singleClass.date).getMinutes()}{new Date(singleClass.date).getHours() >=12 ? '  PM': 'AM'}</p>
                    
                </div>))
            }
        </div>
    );
};

export default PaymentHistory;