import { Link, NavLink, Outlet } from "react-router-dom";


const InstructorBoard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content w-12/12 flex flex-col items-center justify-center">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button absolute top-0 right-0 lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 h-full bg-orange-300 text-base-content">
    

      <h1 className="text-center text-2xl">Welcome to Instructor Dashboard</h1>
      <div className="flex justify-center items-center">
    <Link to="/"><svg className="bg-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg></Link>
    <li>
<NavLink to="/">HOME</NavLink></li>
    </div>
      <hr className="my-5"/>
      <li><NavLink to='/instructorDashboard' className={({ isActive }) => (isActive ? 'text-lime-500 bg-white' : 'text-black')}>Add a Class</NavLink></li>
      <hr className="my-5"/>
      <li><NavLink to='/instructorDashboard/myclass' className={({ isActive }) => (isActive ? 'text-lime-500 bg-white' : 'text-black')}>My Classes</NavLink></li>
      <hr className="mt-5"/>
            
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default InstructorBoard;