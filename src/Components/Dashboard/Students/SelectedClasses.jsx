import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const SelectedClasses = () => {
    const {user, loader} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    
    
    const {data: items =[], refetch} = useQuery(['users', user?.email], async ()=>{
        const res = await axiosSecure.get(`/selected/${user?.email}`)
        return res.data;
    })
    const handleDelete = id =>{
        axiosSecure.delete(`/delete/${id}`)
        refetch();
        console.log('hello')
        refetch()
    }
    if(loader){
        return <p>loading</p>
    }
    
    console.log(items)
    return (
        <div className="grid gap-10">
            {
                items.map(item =>(<div key={item._id} className="flex gap-10 bg-red-200 items-center px-5 rounded-lg">
                    <img src={item.image} alt="" className="w-16 p-1" />
                    <p><b>Name: </b>{item.name}</p>
                    <p><b>Price: </b>{item.price}</p>
                    <button className="btn btn-active btn-accent">Pay</button>
                    <button onClick={()=>handleDelete(item._id)} className="btn btn-active btn-secondary ">Delete</button>
                </div>))
            }
        </div>
    );
};

export default SelectedClasses;