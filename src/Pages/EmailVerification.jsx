import axios from 'axios';
import { useEffect, useState } from 'react';
import { verifyUserRoute } from '../Components/ApiRoutes';
import { GoVerified } from 'react-icons/go';
import { toast } from 'react-toastify';

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const verifyUser = async () => {
    const searchParams = new URLSearchParams(location.search);

    try {
      const userId = searchParams.get('userId');
      const token = searchParams.get('token');

      const { data } = await axios.get(`${verifyUserRoute}/${userId}/${token}`);
      console.log(data);
      if (data.success === true) {
        setIsVerified(true);
        toast.success(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center m-auto mt-[5rem]">
          <p className="font-extrabold text-3xl">LOADING...</p>
        </div>
      ) : isVerified ? (
        <div className="flex flex-col items-center justify-center m-auto mt-[5rem]">
          <GoVerified className="text-8xl md:text-9xl" />
          <p className=" text-xl md:font-bold md:text-4xl italic mt-[1rem] text-pry8">
            Verification successful
          </p>
        </div>
      ) : (
        <div className="">
          <p className="uppercase font-bold text-3xl text-red-700">Not Found</p>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
