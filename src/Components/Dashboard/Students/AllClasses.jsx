import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAdminSecure from "../../../API/useAdminSecure";
import useAxiosSecure from "../../../API/useAxiosSecure";
import useInstructor from "../../../API/useInstructor";
import { AuthContext } from "../../../Provider/AuthProvider";


const AllClasses = () => {
    const [classes, setClasses] = useState([])
    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdminSecure()
    const [insTructor] = useInstructor()
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        axiosSecure.get('/approvedClasses')
        .then(res =>{
            setClasses(res.data)
        })
    },[])
    
    const handleBookings = item =>{
        const {name, image, instructorName, price, seats, _id} = item;
        if(!user){
            Swal.fire({
                title: 'Please Login first?',
                
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login",{state: {from: location}})
                }
              })

        }
        else{
            axiosSecure.post('/bookings',{menuItem: _id, name, image, instructorName, price, seats, email: user.email})
        }
    }
    return (
        <div className="grid grid-cols-3 gap-5 w-11/12 mx-auto">
            {
                classes?.map(singleClass =>(<div key={singleClass._id} className="bg-neutral-300 w-full shadow-md ">
                    <img src={singleClass.image} alt="" className="p-2 h-96 w-full" />
                    <div className="grid mx-auto text-center">
                    <p><b>Class Name: </b>{singleClass.name}</p>
                    <p><b>Instructor Name: </b>{singleClass.instructorName}</p>
                    <p><b>Available seats: </b>{singleClass.seats}</p>
                    <p><b>price: </b>{singleClass.price}</p>
                    <button className="btn btn-outline btn-success" onClick={() =>handleBookings(singleClass)} disabled={singleClass.seats === '0' || isAdmin || insTructor && true}>Select</button>
                    </div>
                </div>))
            }
        </div>
    );
};

export default AllClasses;