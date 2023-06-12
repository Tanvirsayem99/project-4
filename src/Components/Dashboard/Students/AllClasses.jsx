import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAdminSecure from "../../../API/useAdminSecure";
import useAxiosSecure from "../../../API/useAxiosSecure";
import useInstructor from "../../../API/useInstructor";
import useTile from "../../../API/useTitle";
import { AuthContext } from "../../../Provider/AuthProvider";


const AllClasses = () => {
    useTile('ALL_CLASSES')
    const [classes, setClasses] = useState([])
    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdminSecure()
    const [loading, setLoading] = useState(true)
    const [insTructor] = useInstructor()
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        axiosSecure.get('/approvedClasses')
        .then(res =>{
            if(res.data){
                setLoading(false)
                setClasses(res.data)
            }
        })
    },[])
    const theme = localStorage.getItem('theme')
    if(loading){
        return <span className="loading loading-dots loading-lg  md:w-44"></span>
    }
    if(classes.length === '0'){
        return <p className="text-center font-sans font-semibold text-4xl">No classes available</p>
    }
    
    const handleBookings = item =>{
        const {name, image, instructorName, instructorEmail, price, seats, _id, student} = item;
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
            axiosSecure.post('/bookings',{menuItem: _id, name, image, instructorName, instructorEmail, price, student, seats, email: user.email})
            .then(res =>{
                if(res.data){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully booked this class',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
    }
    return (
        <div className="grid md:grid-cols-3 gap-5 w-11/12 mx-auto pt-20">
            {
                classes?.map(singleClass =>(<div key={singleClass._id} className={`${singleClass.seats <= 0? 'bg-red-500' : 'bg-neutral-300'  } ${theme === 'dark' && 'text-black bg-white shadow shadow-white'} w-full shadow-md `}>
                    <img src={singleClass.image} alt="" className="p-2 h-96 w-full" />
                    <div className="grid mx-auto text-center">
                    <p><b>Class Name: </b>{singleClass.name}</p>
                    <p><b>Instructor Name: </b>{singleClass.instructorName}</p>
                    <p><b>Available seats: </b>{singleClass.seats}</p>
                    <p><b>price: </b>{singleClass.price}</p>
                    <button className="btn btn-outline btn-success" onClick={() =>handleBookings(singleClass)} disabled={singleClass.seats == '0' || isAdmin || insTructor && true}>Select</button>
                    </div>
                </div>))
            }
        </div>
    );
};

export default AllClasses;