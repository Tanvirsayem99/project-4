import { useState } from "react";
import { imgUpload } from "../../../API/imgApi";


const AddClass = () => {
    const [imageName, setImageName] = useState('Upload image')
    const handleImageChange = image =>{
        setImageName(image.name)
    }
    const handleClassData = event =>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const seats = form.seats.value;
        const price = form.price.value;

        const datts = {
            name,
            image,
            instructorName,
            instructorEmail,
            seats,
            price,
        }
        
        imgUpload(image).then(data =>{
            const imgLink = data.data.display_url
        })
    }
    
    
    return (
        <div>
            <form onSubmit={handleClassData} action="">
                <input type="text" name="name" id="" />
                <input type="text" name="instructorName" id="" />
                <input type="text" name="instructorEmail" id="" />
                <input type="text" name="seats" id="" />
                <input type="text" name="price" id="" />
                <input type="submit" value="Add Class" name="" id="" />


            <div className='flex flex-col w-max mx-auto text-center border border-white px-10 py-2 border-dashed '>
                  <label>
                    <input
                      onChange={(event)=>handleImageChange(event.target.files[0])}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      {imageName}
                    </div>
                  </label>
                </div>
            </form>
            
        </div>
    );
};

export default AddClass;