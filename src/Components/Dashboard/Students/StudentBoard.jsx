import { NavLink, Outlet } from "react-router-dom";


const StudentBoard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button absolute top-0 right-0 lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 h-full bg-orange-300 text-base-content">
      <li><NavLink to="/userDashboard">My Selected Classes</NavLink></li>
      <li><NavLink to="/userDashboard/enrolledClass">My Enrolled Classes</NavLink></li>
      <li><NavLink to="/userDashboard/history">Payment history</NavLink></li>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default StudentBoard;