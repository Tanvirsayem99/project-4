import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaSpinner } from 'react-icons/fa';
import useAxiosSecure from "../../API/useAxiosSecure";
import { Link } from "react-router-dom";
const Register = () => {
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
    const [axiosSecure] = useAxiosSecure()
    const {createEmail, updateUser} = useContext(AuthContext)
    const [conErr, setConErr] = useState('')
    const [spin, setSpin] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    setSpin(true)
    setConErr('')
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
        <div className="bg-slate-50 p-5 md:w-2/6 mx-auto mt-10 Box ">
            <h1 className="text-center my-5 text-red-400 font-semibold text-3xl">Register</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-7 w-full">
      <input placeholder="Name" {...register("name", { required: true })} className="py-2 pl-2 outline-none rounded-lg bg-slate-50 box-input" />
      <input placeholder="Email" {...register("Email", { required: true })} className="py-2 pl-2 outline-none bg-slate-50 box-input rounded-lg" />
      <div className="relative w-full">
          <input
          placeholder="Password"
            className="py-2 pl-2 w-full outline-none bg-slate-50 box-input rounded-lg" 
            type={show? 'password' : 'text'}
            {...register("password", {required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/})}
          />
          <div className="absolute top-2 right-2">
            {
                show ? <svg onClick={()=>setShow(!show)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg> :
              <svg onClick={()=>setShow(!show)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            
            }
            
          </div>
        </div>
      <div className="relative w-full">
          <input
          placeholder="Confirm Password"
            className="py-2 pl-2 w-full outline-none bg-slate-50 box-input rounded-lg" 
            type={show2? 'password' : 'text'}
            {...register("Apassword")}
          />
          <div className="absolute top-2 right-2">
            {
                show2 ? <svg onClick={()=>setShow2(!show2)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg> :
              <svg onClick={()=>setShow2(!show2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            
            }
            
          </div>
        </div>
        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
      {
        conErr && <p className="text-red-500">{conErr}</p>
      }
      <input placeholder="image-url" {...register("image", { required: true })} className="py-2 pl-2 outline-none bg-slate-50 box-input rounded-lg" />
      {errors.exampleRequired && <span>This field is required</span>}
      <p>Already have an account? <span>please <Link to="/login">Login</Link></span></p>
      
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