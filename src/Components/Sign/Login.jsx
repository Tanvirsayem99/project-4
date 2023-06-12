import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaSpinner } from 'react-icons/fa';
import useAxiosSecure from "../../API/useAxiosSecure";

const Login = () => {
  const [axiosSecure] = useAxiosSecure();
  const [loginErr, setLoginErr] = useState('')
    const {googleSignIn, loginUser} = useContext(AuthContext)
    const [show, setShow] = useState(true);
    const [spin, setSpin] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setSpin(true)
    const {email} = data;
    const {password} = data;
    loginUser(email, password)
    .then(res => {
      console.log(res)
        setSpin(false)
        navigate(from, {replace:true})
    })
    .catch(err =>{
      setLoginErr(err.message.split(' ')[2].split('/')[1].split(')')[0])
        setSpin(false)
    })
  };
  const handleGoogle = () =>{
    setSpin(true)
    googleSignIn()
    .then(data =>{
      const email = data.user.email;
      axiosSecure.post('/user',{email : email, image:data.user.photoURL , name: data.user.displayName})
      .then(res =>{
          navigate(from, {replace:true})
      })
      .catch(err => setSpin(false))
    }).catch(err =>{
      setSpin(false)
      console.log(err)
  })
    
  }

  return (
    <div className=" p-5 md:w-2/6 mx-auto mt-32 Box">
        <h1 className="text-center my-5 font-semibold text-3xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 w-full">
        <input placeholder="Email" {...register("email")} className="py-2 pl-2 outline-none box-input rounded-lg" />

        <div className="relative w-full">
          <input
          placeholder="Password"
            className="w-full py-2 pl-2 outline-none box-input rounded-lg" 
            type={show? 'password' : 'text'}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 character long",
              },
            })}
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
          <p className="text-red-500">{loginErr && loginErr}</p>
          <p className="mt-5">Don't have account? <span>please <Link to="/register">Register</Link></span></p>
        </div>
        {errors.exampleRequired && <span>This field is required</span>}
        {errors.password && <span>{errors.password.message}</span>}

        

        {
        spin ? <FaSpinner className="mx-auto text-3xl animate-spin text-red-500"></FaSpinner> : <div className="text-center">
        <input type="submit" value="Login" className="hover:bg-transparent text-white border hover:border-red-500 bg-red-500 px-10 py-2 hover:text-black" />
        </div>
      }
        <p className="text-center">-----------------------------------------------------------</p>
        {
            spin? '' :<div className="text-center" onClick={handleGoogle}>
            <span className="hover:bg-transparent border text-white hover:text-black bg-red-500 border-red-500  px-10 py-2 ">Continue with Google</span>
            </div>
        }
      </form>
    </div>
  );
};

export default Login;
