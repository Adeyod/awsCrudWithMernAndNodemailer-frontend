import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import checkTokenExpiration from './authChecker';
import { logoutRoute } from './ApiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logoutSuccess } from '../redux/userSlice';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, access } = useSelector((state) => state.user);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${logoutRoute}`);
      if (data.success === true) {
        dispatch(logoutSuccess(data));
        navigate('/login');
        toast.success(data.message);
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (currentUser && access) {
      checkTokenExpiration(access, dispatch);
    }
  }, [currentUser, access, dispatch]);
  return (
    <div className="flex justify-between text-white bg-pry1 p-5">
      <div className="font-bold ">MY LOGO</div>

      <div className="">
        <div className="hidden md:flex gap-5 font-bold uppercase italic ">
          {currentUser && currentUser !== null ? (
            <div className="flex gap-3">
              <Link to="/profile">Profile</Link>
              <button className="uppercase italic" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
        <div className="md:hidden relative">
          <button className="text-2xl" onClick={handleToggle}>
            {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          <div
            className={
              toggle
                ? 'italic uppercase font-bold flex flex-col bg-pry1 px-10 py-5 right-[-20px] top-[50px] gap-5 absolute'
                : 'hidden'
            }
            onClick={handleToggle}
          >
            {currentUser && currentUser !== null ? (
              <div>
                <Link to="/profile">Profile</Link>
                <button className="uppercase italic" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
