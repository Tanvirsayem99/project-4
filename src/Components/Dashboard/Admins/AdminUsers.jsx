import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from '../../../API/useAxiosSecure'
import { AuthContext } from '../../../Provider/AuthProvider';



const AdminUsers = () => {
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const {data: users =[], refetch} = useQuery(['users'], async ()=>{
        const res = await axiosSecure.get('/allUsers')
        return res.data;
    })
    
    const handleAdmin = (id) =>{
            refetch();
            axiosSecure.put(`/users/role/${id}`,{role: 'admin'})
            .then(data =>{
                refetch();
            })
            
    }
    const handleInstructor = (id) =>{
        
            axiosSecure.put(`/users/role/${id}`,{role: 'instructor'})
            .then(data =>{
                refetch();
            })
    }
    
    return (
        <div>
            
             <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>role</th>
        <th className='flex gap-28'>
        <p>Action</p>
        <p>Action </p>
        </th>
      </tr>
    </thead>
    <tbody>
      
        {
                users?.map((singleUser, index )=>(<tr  key={singleUser._id} >
                        <th>{index + 1}</th>
        <td className='indicator'>{singleUser?.email}{ user?.email === singleUser.email && <p className='indicator-item badge badge-primary'>Me</p>}</td>
        <td>{singleUser?.role? singleUser.role : 'student'}</td>
        <td className="flex gap-5">
        <div className="btn btn-success" disabled={singleUser.role === 'admin' || singleUser.role === 'instructor' && true} onClick={() =>handleAdmin(singleUser._id)}>Make admin</div>
        <div className="btn btn-success" disabled={singleUser.role === 'admin' || singleUser.role === 'instructor' && true} onClick={() =>handleInstructor(singleUser._id)}>Make insTructor</div>
        </td>
                </tr>))
            }

        
      
      
           
    
     
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AdminUsers;