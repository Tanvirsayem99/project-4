import { NavLink, Outlet } from "react-router-dom";


const InstructorBoard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content w-12/12 flex flex-col items-center justify-center">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
    
      <h1>Welcome to Instructor Dashboard</h1>
      <NavLink to='/instructorDashboard/addclass'>Add a Class</NavLink>
            <NavLink to='/instructorDashboard/myclass'>My Classes</NavLink>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default InstructorBoard;