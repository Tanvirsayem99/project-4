import PopularInstructor from "../Popular/PopularInstructor";
import Popular from "../PopularClasses.jsx/Popular";
import Banner from "./Banner";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Popular></Popular>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;