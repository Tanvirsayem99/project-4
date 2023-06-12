import logo from '../../../public/vite.png'
const Footer = () => {
    return (
        <div className="relative">
            <footer className="footer footer-center mt-5 p-10 bg-base-200 text-base-content rounded">
  <div className="md:absolute relative md:left-5 md:top-5 text-2xl font-semibold flex">
  <img src={logo} alt="" className="w-10 h-10"/>
    SUMMER SPORTS CAMP
  </div> 
  <div>
    <h1>contact</h1>
    <p>Number: +880-1690187372</p>
    <p>Email: Tanvirhadaidersayem@gmail.com</p>
    <p>Address: Feni, Bangladesh</p>
  </div> 
  <div>
    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
  </div>
</footer>
        </div>
    );
};

export default Footer;