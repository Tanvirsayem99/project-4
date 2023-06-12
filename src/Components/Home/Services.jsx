import { motion } from "framer-motion";
const Services = ({theme}) => {
    
    return (
        
      <>
      <div className={`my-5 ${ theme === 'dark' ?'text-center text-teal-500 ': 'text-center text-purple-700 '}`}>
             <p>-------------------------- O -------------------------</p>
                <h1 className="text-4xl">Our Services</h1>
                <p>-------------------------- O -------------------------</p>
            </div>

      <div className="grid md:grid-cols-4 gap-5 mx-auto">
      <motion.div
      drag
      className=" h-56 bg-slate-200 p-5 shadow w-56 mx-auto text-center"
      animate={{

        rotate: [0, 0, 6, -6, 0],
        
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0
      }}
    > <div className="w-28 mx-auto my-5">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2vW7G-bjJCf2V1TWy8K0Ngpza5iq3My7K33IRLsbBw&snpm r" alt="" /> 
    </div>
    Live conversation with Instructors</motion.div>
      <motion.div
      drag
      className=" h-56 bg-slate-200 p-5 shadow w-56 mx-auto text-center"
      animate={{
        rotate: [0, 0, 6, -6, 0],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0
      }}
    > <div className="w-28 mx-auto my-5">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/000/356/862/small/Education__2810_29.jpg" alt="" /> 
    </div>
    certificate Guaranty</motion.div>
      <motion.div
      drag
      className=" h-56 bg-slate-200 p-5 shadow w-56 mx-auto text-center"
      animate={{
 
        rotate: [0, 0, 6, -6, 0],
        
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0
      }}
    > <div className="w-28 mx-auto my-5">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Noun_Project_academic_icon_977011_cc.svg/1280px-Noun_Project_academic_icon_977011_cc.svg.png" alt="" /></div> 
    Academic support</motion.div>
      <motion.div
      drag
      className=" h-56 bg-slate-200 p-5 shadow w-56 mx-auto text-center"
      animate={{

        rotate: [0, 0, 6, -6, 0],
        
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0
      }}
    > <div className="w-28 mx-auto my-5">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGo_j6siginVYJViWCiKbNjbmWNZzMNydEnT3Pve0&s" alt="" /> 
    </div>
    Every Day Session</motion.div>
    
     
      </div>
      
      </>
    );
};

export default Services;




