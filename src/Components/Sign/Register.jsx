import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaSpinner } from 'react-icons/fa';
import useAxiosSecure from "../../API/useAxiosSecure";
const Register = () => {
    const [axiosSecure] = useAxiosSecure()
    const {createEmail, updateUser} = useContext(AuthContext)
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
        createEmail(Email, password)
        .then(Data =>{
            
            if(data){
                setSpin(false)
                     
            }
            updateUser(name, image)
            .then(data =>{
                axiosSecure.post('/user',{email : Email, image:image , name: name})
                
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
        <div className="bg-slate-100 p-5 md:w-2/6 mx-auto mt-32 shadow-lg border">
            <h1 className="text-center my-5 text-red-400 font-semibold text-3xl">Register</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 w-full">
      <input placeholder="Name" {...register("name", { required: true })} className="py-2 pl-2 outline-none rounded-lg bg-red-100" />
      <input placeholder="Email" {...register("Email", { required: true })} className="py-2 pl-2 outline-none bg-red-100" />
      <input placeholder="password" {...register("password",{required: true,
        minLength: 6,
        maxLength: 20,
        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/} )} className="py-2 pl-2 outline-none bg-red-100" />
        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
      <input placeholder="Confirm Password" {...register("Apassword", { required: true })} className="py-2 pl-2 outline-none bg-red-100" />
      {
        conErr && <p className="text-red-500">{conErr}</p>
      }
      <input placeholder="image-url" {...register("image", { required: true })} className="py-2 pl-2 outline-none bg-red-100" />
      {errors.exampleRequired && <span>This field is required</span>}
      
      {
        spin ? <FaSpinner className="mx-auto text-3xl text-red-500 animate-spin"></FaSpinner> : <div className="text-center">
        <input type="submit" value="Register" className="hover:bg-transparent border text-white border-red-500 bg-red-500 px-10 py-2 hover:text-black" />
        </div>
      }
      
      
    </form>
        </div>
    );
};

export default Register;