import useAllUsersRole from "../../../API/useAllUsersRole";
import useAxiosSecure from "../../../API/useAxiosSecure";


const AllUsersDetails = ({user, index}) => {
    const [AxiosSecure] = useAxiosSecure()
    const [refetch] = useAllUsersRole();
    const handleAdmin = (id) =>{
        refetch();
            AxiosSecure.put(`/users/role/${id}`,{role: 'admin'})
            
    }
    const handleInstructor = (id) =>{
        
            AxiosSecure.put(`/users/role/${id}`,{role: 'instructor'})
            refetch();
    }
    return (
        <tr className="">
           <th>{index + 1}</th>
        <td>{user?.email}</td>
        <td>{user?.role}</td>
        <td className="flex gap-5">
        <div className="btn btn-success" onClick={() =>handleAdmin(user._id)}>Make admin</div>
        <div className="btn btn-success" onClick={() =>handleInstructor(user._id)}>Make insTructor</div>
        </td>
        </tr>
    );
};

export default AllUsersDetails;