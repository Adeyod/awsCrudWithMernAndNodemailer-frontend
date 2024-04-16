import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerRoute } from '../Components/ApiRoutes';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(registerRoute, formData);
      console.log(data);
      if (data.success === true) {
        toast.success(data.message);
        return;
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center lg:justify-around items-center mt-[-10px] md:mt-0 h-[100vh]">
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
          Register
        </p>
        <div className="mb-[2px] flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="p-2 rounded-lg border"
            onChange={handleFormData}
          />
        </div>
        <div className="mb-[2px] flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="p-2 rounded-lg border"
            onChange={handleFormData}
          />
        </div>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
        <div className="mb-[2px] flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="p-2 rounded-lg border"
            onChange={handleFormData}
          />
        </div>

        <p>
          Already have an account?
          <Link to="/login" className="text-blue-700 pl-1">
            Login
          </Link>
        </p>

        <button
          type="submit"
          className="ml-20 border rounded-lg py-1 px-2 font-bold text-white bg-pry1 mt-1 flex item-center justify-center"
        >
          {loading ? <p className="italic">LOADING...</p> : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
