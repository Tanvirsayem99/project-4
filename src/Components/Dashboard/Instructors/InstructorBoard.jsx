import { NavLink, Outlet } from "react-router-dom";


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
      <li><NavLink to='/instructorDashboard'>Add a Class</NavLink></li>
      <li><NavLink to='/instructorDashboard/myclass'>My Classes</NavLink></li>
            
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default InstructorBoard;