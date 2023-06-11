
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <p className="text-red-500 text-9xl text-center mt-20">404</p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
        alt=""
        className="w-1/6 md:w-1/6 mx-auto"
      />
      <h1 className="text-red-500 font-semibold text-3xl text-center">Oops!</h1>
      <p className="text-center my-5">
        Sorry, you enter a invalid path, please enter valid path
      </p>
      <p className="text-center">
        <i>{Error.statusText || Error.message}</i>
      </p>
      <div className="text-center bg-yellow-900 w-36 p-3 text-white mx-auto rounded-lg">
      <Link to="/">Back To Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
