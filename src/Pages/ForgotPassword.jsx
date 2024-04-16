import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { forgotPasswordRoute } from '../Components/ApiRoutes';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState('');
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (formData === '') {
        toast.error('You can not send an empty message');
        return;
      }
      const { data } = await axios.post(forgotPasswordRoute, formData);
      if (data.success === true) {
        toast.success(data.message);
        return;
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
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
        <p className="my-5 text-center uppercase underline font-bold italic">
          forgot password
        </p>

        <div className="mb-[20px] flex flex-col">
          <label htmlFor="email" className="mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email here..."
            className="p-2 rounded-lg border"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="ml-20 mb-10 border rounded-lg py-1 px-2 font-bold text-white bg-pry1 mt-5 flex item-center justify-center"
        >
          {loading ? (
            <p className="italic font-bold">LOADING...</p>
          ) : (
            <p>SUBMIT</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
