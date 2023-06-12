import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const MyClass = () => {
    const {user, loader} = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [axiosSecure] = useAxiosSecure();
    const [upid, setUpId] = useState('')

    const {data: classes =[], refetch} = useQuery(['classes'], async ()=>{
        const res = await axiosSecure.get(`/instructorClasses/${user?.email}`)
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
      return <p className="text-center font-sans font-semibold text-4xl">No Class Available</p>
  }
    const handleSubmit = event =>{
      event.preventDefault();
      const form = event.target;
      const name = form.name.value;
      const seats = form.seats.value;
      const price = form.price.value;
      
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
         refetch()
        if (result.isConfirmed) {
          axiosSecure.put(`/classUpdate/${upid}`,{name: name, seats :seats, price: price })
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
        <div>
            <div className="overflow-x-auto mt-16">
              <h1 className="text-center text-2xl my-5 ">My Classes</h1>
  <table className="table">
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Name</th>
        <th>Image</th>
        <th>status</th>
        <th>Price</th>
        <th>Seats</th>
        <th>Enrolled student</th>
        {

        }
        <th>Feedback</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        classes.map((singleClass, index) =>(<tr key={singleClass._id}>
            <td>{index + 1}</td>
            <td>{singleClass.name}</td>
            <td><img className="w-16" src={singleClass.image} alt="" /></td>
            <td>{singleClass?.status}</td>
            <td>{singleClass.price}</td>
            <td>{singleClass.seats}</td>
            <td>{singleClass?.student ? singleClass.student : '0'}</td>
            {
              singleClass.status === 'approved' || singleClass.seats === 'pending' ? <td>{singleClass?.feedback ? singleClass.feedback : ''}</td> : <td></td>
            }
            
            <td><button> <label htmlFor="my_modal_6" className="btn" onClick={()=>setUpId(singleClass._id)}>update</label></button></td>
        </tr>))
      }
    </tbody>
  </table>
  
    {
      classes.map((singleClass, index) =>(<div key={singleClass._id}>
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
             <div className="modal-box">
                 <h3 className="font-bold text-lg text-center my-5">Update your classes</h3>
                <form action="" className="grid gap-5" onSubmit={handleSubmit}>
                <input type="text" defaultValue={singleClass.name} name="name" id="" className="bg-slate-200 py-2  pl-2" placeholder="update Class name" required/>
                <input type="text" defaultValue={singleClass.seats}  name="seats" id="" className="bg-slate-200 py-2 pl-2" placeholder="update Available seats" required/>
                <input type="text" defaultValue={singleClass.price}  name="price" id="" className="bg-slate-200 py-2 pl-2" placeholder="update price" required />
                
                <input type="submit" value="update Class" name="" id="" className="bg-slate-200 py-2 pl-2 border cursor-pointer border-black" />
                
                 </form>
              <div className="modal-action">
               <label htmlFor="my_modal_6" className="btn">Close!</label>
             </div>
            </div>
            </div>
            </div>
      </div>))
    }

</div>
        </div>
    );
};

export default MyClass;