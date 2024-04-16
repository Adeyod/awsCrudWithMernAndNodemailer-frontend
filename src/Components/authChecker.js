import { jwtDecode } from 'jwt-decode';

import { removeUser } from '../redux/userSlice';

const checkTokenExpiration = (access, dispatch) => {
  const decodedToken = jwtDecode(access);

  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  if (expirationTime < currentTime) {
    dispatch(removeUser());
  }
};

export default checkTokenExpiration;
