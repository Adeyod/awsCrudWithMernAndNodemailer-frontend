const host = 'http://localhost:3434/api';

const registerRoute = `${host}/user/register-user`;
const loginRoute = `${host}/user/login-user`;
const verifyUserRoute = `${host}/user/verify-user`;
const forgotPasswordRoute = `${host}/user/forgot-password`;
const resetPasswordRoute = `${host}/user/reset-password`;
const allowResetPasswordRoute = `${host}/user/allow-reset-password`;
const updateUserRoute = `${host}/user/update-user`;
const logoutRoute = `${host}/user/logout`;

export {
  allowResetPasswordRoute,
  logoutRoute,
  resetPasswordRoute,
  registerRoute,
  loginRoute,
  verifyUserRoute,
  forgotPasswordRoute,
  updateUserRoute,
};
