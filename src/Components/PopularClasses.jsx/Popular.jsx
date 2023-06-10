import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../API/useAxiosSecure";


const Popular = () => {
    const[axiosSecure] = useAxiosSecure()
    const {data: classes =[], refetch} = useQuery(['class',], async ()=>{
        const res = await axiosSecure.get('/popular')
        return res.data;
    })
    console.log(classes)
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                classes.map(singleClass =>(<div key={singleClass._id} className="bg-slate-200 shadow-xl p-3">
                    <img src={singleClass.image} alt="" className="w-full h-64" />
                    <div className="grid gap-3 mt-5">
                    <div className="flex justify-center gap-2"><b>Name: </b><p>{singleClass.name}</p></div>
                    <div className="flex justify-center gap-2"><b>Price: </b><p>{singleClass.price}</p></div>
                    <div className="flex justify-center gap-2"><b>Available Seats: </b><p>{singleClass.seats}</p></div>
                    <div className="flex justify-center gap-2"><b>students: </b><p>{singleClass.student}</p></div>
                    
                    
                    
                    </div>
                </div>))
            }
        </div>
    );
};

export default Popular;