import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePreviewImg from '../Components/usePreviewImg';
import axios from 'axios';
import { updateUserRoute } from '../Components/ApiRoutes';
import { toast } from 'react-toastify';
import { loginStart, updateUser } from '../redux/userSlice';

axios.defaults.withCredentials = true;
const ProfilePage = () => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  console.log(currentUser);

  const fileRef = useRef(null);

  const { handleImageChange, fileData } = usePreviewImg();

  const [inputs, setInputs] = useState({
    firstName: currentUser !== null && currentUser?.firstName,
    lastName: currentUser !== null && currentUser?.lastName,
    userName: currentUser !== null && currentUser?.userName,
    email: currentUser !== null && currentUser?.email,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const formData = new FormData();
      formData.append('firstName', inputs.firstName);
      formData.append('userName', inputs.userName);
      formData.append('lastName', inputs.lastName);
      formData.append('email', inputs.email);
      formData.append('file', fileData);

      const { data } = await axios.post(
        `${updateUserRoute}/${currentUser._id}`,
        formData
      );
      if (data.success === true) {
        toast.success(data.message);
        dispatch(updateUser(data.user));
        return;
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <form
        action=""
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="mt-10">
          <p className="uppercase font-bold underline text-2xl italic text-pry1">
            Profile Page
          </p>
          <img
            src={
              fileData
                ? URL.createObjectURL(fileData)
                : currentUser.image
                ? currentUser.image.url
                : ''
            }
            alt="userImage"
            className="mb-3 rounded-full w-[150px] h-[150px] items-center mt-10"
          />

          <label
            className="uppercase text-white bg-pry8 font-bold italic p-2 rounded-lg ml-5"
            onClick={() => fileRef.current.click()}
            htmlFor="fileInput"
          >
            choose file
          </label>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
        </div>
        <div className="mt-10 md:flex gap-[150px]">
          <div className="flex flex-col">
            <div className="">
              <label htmlFor="userName" className="uppercase font-bold">
                Username:{' '}
              </label>
              <input
                className="border pl-2 rounded-md"
                type="text"
                name="userName"
                value={inputs.userName}
                onChange={(e) =>
                  setInputs({ ...inputs, userName: e.target.value })
                }
              />
            </div>

            <div className="">
              <label htmlFor="firstName" className="uppercase font-bold">
                first name:{' '}
              </label>
              <input
                type="text"
                className="border pl-2 rounded-md my-3"
                value={inputs.firstName}
                onChange={(e) =>
                  setInputs({ ...inputs, firstName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="">
              <label htmlFor="lastName" className="uppercase font-bold">
                Last name:{' '}
              </label>
              <input
                type="text"
                name="lastName"
                className="border pl-2 rounded-md mb-3"
                value={inputs.lastName}
                onChange={(e) =>
                  setInputs({ ...inputs, lastName: e.target.value })
                }
              />
            </div>

            <div className="">
              <label htmlFor="email" className="uppercase font-bold">
                email:{' '}
              </label>
              <input
                className="w-[70%]"
                type="text"
                name="email"
                value={inputs.email}
                // onChange={(e) => ({ ...inputs, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="my-5 w-[200px] border-2 py-2 px-4 text-white italic rounded-full uppercase font-bold bg-pry8 border-solid"
        >
          {loading ? <p>LOADING...</p> : <p>Update Profile</p>}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
