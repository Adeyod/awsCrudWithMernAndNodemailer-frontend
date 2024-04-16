import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  allowResetPasswordRoute,
  resetPasswordRoute,
} from '../Components/ApiRoutes';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  console.log(formData);

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePageOpening = async () => {
    try {
      const { data } = await axios(
        `${allowResetPasswordRoute}/${userId}/${token}`
      );
      if (data.success === true) {
        setIsAllowed(true);
        toast.success(data.message);
        return;
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    handlePageOpening();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!formData) {
        toast.error('You can not send empty message');
        return;
      } else if (formData.password !== formData.confirmPassword) {
        toast.error('Password and confirm password do not match');
        return;
      }

      const { data } = await axios.post(
        `${resetPasswordRoute}/${userId}/${token}`,
        formData
      );
      if (data.success === true) {
        toast.success(data.message);
        navigate('/login');
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
    <div>
      {pageLoading ? (
        <div className="flex flex-col items-center justify-center m-auto mt-[5rem]">
          <p className="font-extrabold text-3xl">LOADING...</p>
        </div>
      ) : isAllowed ? (
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
            <p className="my-5 text-center uppercase underline font-bold italic">
              Reset Password
            </p>

            <div className="mb-[20px] flex flex-col">
              <label htmlFor="password" className="mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password here..."
                className="p-2 rounded-lg border"
                onChange={handleChange}
              />
            </div>

            <div className="mb-[20px] flex flex-col">
              <label htmlFor="confirmPassword" className="mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password here..."
                className="p-2 rounded-lg border"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={
                loading
                  ? 'ml-20 mb-10 border rounded-lg py-1 px-2 font-bold text-white bg-pry2 mt-5 flex item-center justify-center'
                  : 'ml-20 mb-10 border cursor-pointer rounded-lg py-1 px-2 font-bold text-white bg-pry1 mt-5 flex item-center justify-center'
              }
              disabled={loading}
            >
              {loading ? (
                <p className="italic font-bold">LOADING...</p>
              ) : (
                <p>SUBMIT</p>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p className="uppercase font-bold text-3xl text-red-700">
            You are not authorized to do this
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
