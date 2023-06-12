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
    > Live conversation with Instructors</motion.div>
      <motion.div
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
    > certificate Guaranty</motion.div>
      <motion.div
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
    > Academic support</motion.div>
      <motion.div
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
    > Every Day Session</motion.div>
    
     
      </div>
      
      </>
    );
};

export default Services;




