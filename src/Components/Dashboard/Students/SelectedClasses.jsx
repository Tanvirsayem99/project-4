import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(`${import.meta.env.VITE_stripe}`);

const SelectedClasses = () => {
    const[exactId, setExactId] = useState('')
    const {user, loader} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    
    
    const {data: items =[], refetch} = useQuery(['users', user?.email], async ()=>{
        const res = await axiosSecure.get(`/selected/${user?.email}`)
        return res.data;
    })
    const handleDelete = id =>{
        axiosSecure.delete(`/delete/${id}`)
        refetch();
        refetch()
    }
    if(loader){
        return <p>loading</p>
    }
    
    return (
        <div className="grid gap-10">
            {
                items.map(item =>(<div key={item._id} className="flex gap-10 bg-red-200 items-center px-5 rounded-lg">
                    <img src={item.image} alt="" className="w-16 p-1" />
                    <p><b>Name: </b>{item.name}</p>
                    <p><b>Price: </b>{item.price}</p>
                    <label htmlFor="my_modal_6" className="btn" onClick={()=>setExactId(item)}>Pay</label>
                    <button onClick={()=>handleDelete(item._id)} className="btn btn-active btn-secondary ">Delete</button>
                    <div>
            
                     <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                      <div className="modal">
                      <div className="modal-box">
                      <h3 className="font-bold text-lg">Payment Now</h3>
                     <Elements stripe={stripePromise} ><CheckoutForm item={item} exactId={exactId}></CheckoutForm></Elements>
                   <div className="modal-action">
                    <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                  </div>
               </div>
               </div>
                </div>))
                
            }
        </div>
    );
};

export default SelectedClasses;