
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { imgUpload } from "../../../API/imgApi";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const AddClass = () => {
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const [loader, setLoader] = useState(false)
    const [imageName, setImageName] = useState('Upload image')
    const handleImageChange = image =>{
        setImageName(image.name)
    }
    const {data: instructors =[]} = useQuery(['users'], async ()=>{
      const res = await axiosSecure.get(`/instructorsData/${user?.email}`)
        return res.data;
  });
  

  let updateClass = instructors.class + 1 ;
  


    const handleClassData = event =>{
        event.preventDefault()
        setLoader(true)
        const form = event.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const seats = form.seats.value;
        const price = form.price.value;

        
        
        
        imgUpload(image).then(data =>{
            const imgLink = data.data.display_url;
            if(instructors){
              axiosSecure.put(`/instructors/${user?.email}`,{instructorName: user?.displayName, image:user?.photoURL, email: user?.email,  class: updateClass})
            }
            else{
              axiosSecure.put(`/instructors/${user?.email}`,{instructorName: user?.displayName, image:user?.photoURL, email: user?.email,  class: 1})
            }
            
            axiosSecure.post(`/addClass/${user?.email}`, {name : name,image : imgLink, 
                instructorName : instructorName, instructorEmail : instructorEmail,
                seats: seats,price : price, status: 'pending', student: 0, instructorImage: user?.photoURL})
                .then(res =>{
                  form.reset()
                  if(res.data.acknowledged){
                    setImageName('Upload image')
                    setLoader(false)
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Your class has been saved',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                  
                })
        })
    }
    
    
    return (
        <div>
            <form onSubmit={handleClassData} action="" className="grid gap-5 md:w-[700px] w-[350px] mt-16 Box p-5">
              <h1 className="text-center text-3xl mb-5">Add Class</h1>
                <input type="text" name="name" id="" className=" py-2  pl-2 box-input" placeholder="Enter Class name " required/>
                <div className='flex flex-col w-max mx-auto text-center border border-white px-10 py-2 border-dashed '>
                  <label>
                    <input
                      onChange={(event)=>handleImageChange(event.target.files[0])}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                      required
                    />
                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      {imageName}
                    </div>
                  </label>
                </div>
                <input type="text" name="instructorName" id="" className="box-input py-2 pl-2" value={user?.displayName} readOnly required/>
                <input type="text" name="instructorEmail" id="" className="box-input py-2 pl-2" value={user?.email}  readOnly required/>
                <input type="text" name="seats" id="" className="box-input py-2 pl-2" placeholder="Enter Available seats" required/>
                <input type="text" name="price" id="" className="box-input py-2 pl-2" placeholder="Enter price" required />
                {
                  loader?  <FaSpinner className="mx-auto text-3xl animate-spin text-red-500"></FaSpinner> : <input type="submit" value="Add Class" name="" id="" className="bg-slate-200 cursor-pointer btn btn-outline btn-success py-2 pl-2" />
                }
                


            
            </form>
            
        </div>
    );
};

export default AddClass;