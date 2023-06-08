import { useContext } from "react";
import { NavLink } from "react-router-dom";
import useAdminSecure from "../../API/useAdminSecure";
import useInstructor from "../../API/useInstructor";
import { AuthContext } from "../../Provider/AuthProvider";


const Navbar = () => {
  const {logOut, user} = useContext(AuthContext);
    const [isAdmin] = useAdminSecure();
    const [insTructor] = useInstructor();
    console.log(isAdmin)
    console.log(insTructor)



    
    const hadleLogOut = () =>{
        logOut()
    }
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/instructors'>Instructors</NavLink></li>
            <li><NavLink to='/classes'>Classes</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            {user && <button onClick={hadleLogOut} className="cursor-pointer">LogOut</button>}
            {isAdmin && <NavLink to='/adminDashboard'>Dashboard</NavLink>}
            {insTructor && <NavLink to='/instructorDashboard'>Dashboard</NavLink>}
            {user && !isAdmin && !insTructor ? <NavLink to='/userDashboard'>Dashboard</NavLink> : ''}
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/instructors'>Instructors</NavLink></li>
            <li><NavLink to='/classes'>Classes</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            {user && <button onClick={hadleLogOut} className="cursor-pointer">LogOut</button>}
            {isAdmin && <NavLink to='/adminDashboard'>Dashboard</NavLink>}
            {insTructor && <NavLink to='/instructorDashboard'>Dashboard</NavLink>}
            {user && !isAdmin && !insTructor ? <NavLink to='/userDashboard'>Dashboard</NavLink> : ''}
    </ul>
  </div>
  <div className="navbar-end">
    {
        user? <img src={user.photoURL} alt="" /> : ''
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;