
const Services = ({theme}) => {
    
    return (
        
      <>
      <div className={`my-5 ${ theme === 'dark' ?'text-center text-teal-500 ': 'text-center text-purple-700 '}`}>
             <p>-------------------------- O -------------------------</p>
                <h1 className="text-4xl">Our Services</h1>
                <p>-------------------------- O -------------------------</p>
            </div>

      <div className="grid md:grid-cols-3 mx-auto">
      <div className="bg-white p-5 shadow w-4/6 mx-auto text-center">Academic support</div>
      <div className="bg-white p-5 shadow w-4/6 mx-auto text-center">Live conversation with Instructors</div>
      <div className="bg-white p-5 shadow w-4/6 mx-auto text-center">certificate Guaranty</div>
      </div>
      
      </>
    );
};

export default Services;




