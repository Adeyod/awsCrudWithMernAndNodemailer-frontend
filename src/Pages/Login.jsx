import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRoute } from '../Components/ApiRoutes';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';

axios.defaults.withCredentials = true;
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState('');
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post(loginRoute, formData);
      console.log(data);

      if (data.success === true) {
        toast.success(data.message);
        dispatch(loginSuccess({ user: data.user, access: data.info }));
        navigate('/profile');
        return;
      } else {
        toast.error(data.message);
        dispatch(loginFailure(data.message));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center md:justify-around items-center mt-[-10px] md:mt-0 h-[100vh]">
      <div className="hidden lg:flex">
        <img
          src="https://res.cloudinary.com/dgxyjw6q8/image/upload/v1689442752/Ekiti%20MarketPlace/ztyx2p1gcdk0rlrryj7q.jpg"
          className="w-[500px] h-[500px] rounded-full"
          alt="image1"
        />
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        method="POST"
        className="w-[300px] py-[10px] px-[15px] border-[1px] border-pry6 rounded bg-pry7"
      >
        <p className=" text-center uppercase underline font-bold italic">
          Login
        </p>

        <div className="mb-[2px] flex flex-col">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            placeholder="User name"
            className="p-2 rounded-lg border"
            onChange={handleFormData}
          />
        </div>

        <div className="mb-[2px] flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 rounded-lg border"
            onChange={handleFormData}
          />
        </div>

        <p className="my-3">
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-700 pl-1">
            Register
          </Link>
        </p>

        <p className="mb-2">
          Forgot password?
          <Link to="/forgot-password" className="text-blue-700 pl-1">
            Click here
          </Link>
        </p>

        <button
          type="submit"
          className="ml-20 border rounded-lg py-1 px-2 font-bold text-white bg-pry1 mt-1 flex item-center justify-center"
        >
          {loading ? (
            <p className="italic font-bold">LOADING...</p>
          ) : (
            <p>LOGIN</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
