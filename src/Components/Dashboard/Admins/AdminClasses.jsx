import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const AdminClasses = () => {
    const {user, loader} = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [axiosSecure] = useAxiosSecure();
    const [feedId, setFeedId] = useState('')
    const {data: classes =[], refetch} = useQuery(['classes'], async ()=>{
        // setLoading(true)
        const res = await axiosSecure.get(`/allClasses/${user?.email}`)
        if(res.data){
          setLoading(false)
          return res.data;
        }
    });
    if(loading){
      return <span className="loading loading-dots loading-lg  md:w-44"></span>
  }
  if(loader){
      return <span className="loading loading-dots loading-lg  md:w-44"></span>
  }
  if(classes.length === '0'){
      return <p className="text-center font-sans font-semibold text-4xl">No class available</p>
  }
    const handleAprrove = (id) =>{
        refetch()
        axiosSecure.put(`/approve/${id}`,{status: 'approved'})
        refetch()
    }
    const handleDenied = (id) =>{
        refetch()
        axiosSecure.put(`/approve/${id}`,{status: 'denied'})
        refetch()
    }
    const handleFeedbackSubmit = event =>{
      event.preventDefault();
      const form = event.target;
      const feedback = form.feedback.value;
      
      refetch()
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
         refetch()
        if (result.isConfirmed) {
          axiosSecure.put(`/approve/${feedId}`,{feedback: feedback});
          refetch()
          Swal.fire('Saved!', '', 'success')
          refetch()
          form.reset()
        } else if (result.isDenied) {
          form.reset()
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      
    }
    

    return (
        <div className="mt-16">
             <div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Name</th>
        <th>Image</th>
        <th>instructorName</th>
        <th>instructorEmail</th>
        <th>status</th>
        <th>Price</th>
        <th>Seats</th>
        <th>Approve</th>
        <th>Deny</th>
        <th>Feedback</th>
      </tr>
    </thead>
    <tbody>
      {
        classes.map((singleClass, index) =>(<tr key={singleClass._id}>
            <td>{index + 1}</td>
            <td>{singleClass.name}</td>
            <td><img className="w-16" src={singleClass.image} alt="" /></td>
            <td>{singleClass.instructorName}</td>
            <td>{singleClass.instructorEmail}</td>
            <td>{singleClass?.status}</td>
            <td>{singleClass.price}</td>
            <td>{singleClass.seats}</td>
            <td><div onClick={()=> handleAprrove(singleClass._id)} disabled={singleClass?.status === 'denied' || singleClass?.status === 'approved' && true} className="btn btn-info">Approve</div></td>
            <td><div onClick={()=> handleDenied(singleClass._id)} disabled={singleClass?.status === 'denied' || singleClass?.status === 'approved' &&  true} className="btn btn-info">Deny</div></td>
            <td><label htmlFor="my_modal_6" className="btn bg-white" onClick={()=>setFeedId(singleClass._id)}>Feedback</label></td>
        </tr>))
      } 
    </tbody>
  </table>
  
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Feedback</h3>
    <form action="" onSubmit={handleFeedbackSubmit}>
    <textarea name="feedback" id="" cols="30" rows="10" className="bg-slate-100 w-full pl-3" placeholder="Type your feedback"></textarea>
    <div className="text-center">
    <input className="border-2 border-sky-500 px-5 py-1 mt-5 hover:bg-sky-500 hover:text-white" type="submit" />
    </div>
    </form>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
</div>
        </div>
    );
};

export default AdminClasses;