import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaSpinner } from 'react-icons/fa';
import useAxiosSecure from "../../API/useAxiosSecure";
const Register = () => {
    const [axiosSecure] = useAxiosSecure()
    const {createUser, updateUser} = useContext(AuthContext)
    const [conErr, setConErr] = useState('')
    const [spin, setSpin] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    setSpin(true)
    const {name} = data;
    const {Email} = data;
    const {password} = data;
    const {Apassword} = data;
    const {image} = data;
    if(password === Apassword){
        createUser(Email, password)
        .then(data =>{
            console.log(data)
            if(data){
                setSpin(false)
                const email = data.user.email;
                const result = axiosSecure.put(`/users/${email}`,{email : email, role: 'student'})
                .then(result =>{
                    console.log(result)
                })
                
            }
            updateUser(name, image)
            .then(data =>{
                console.log(data)
                
            })

        })
        .catch(err =>{
            setSpin(false)
            console.log(err)
        })
    }
    else{
        setConErr('password field does not match ')
        setSpin(false)
    }
    
    };
    return (
        <div className="bg-slate-100 p-5 md:w-2/6 mx-auto mt-32 border-red-500 border">
            <h1 className="text-center my-5 font-semibold text-3xl">Register</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 w-full">
      <input placeholder="Name" {...register("name", { required: true })} className="py-2 pl-2 outline-none" />
      <input placeholder="Email" {...register("Email", { required: true })} className="py-2 pl-2 outline-none" />
      <input placeholder="password" {...register("password", { required: true })} className="py-2 pl-2 outline-none" />
      <input placeholder="Confirm Password" {...register("Apassword", { required: true })} className="py-2 pl-2 outline-none" />
      {
        conErr && <p className="text-red-500">{conErr}</p>
      }
      <input placeholder="image-url" {...register("image", { required: true })} className="py-2 pl-2 outline-none" />
      {errors.exampleRequired && <span>This field is required</span>}
      
      {
        spin ? <FaSpinner className="mx-auto text-3xl text-red-500"></FaSpinner> : <div className="text-center">
        <input type="submit" value="Register" className="bg-transparent border border-red-500 hover:bg-red-500 px-10 py-2 hover:text-white" />
        </div>
      }
      
      
    </form>
        </div>
    );
};

export default Register;