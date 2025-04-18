import axios from "../Axioscustum";
const loginApi = (email, password) => {
    return axios.post("v1/student/login", {email, password});
};
const registerApi = async ({
    name,
    email,
    password,
    student_id,
    className
}) => {
    try {
        const response = await axios.post("v1/student/register", {
            name,
            email,
            password,
            student_id,
            class: className
        });
        return response.data;
    } catch (error) {
        throw error.response ?. data ?. message || "Đăng ký thất bại!";
    }
};
const forgotPasswordApi = (email) => {
    return axios.post("v1/auth/forgot-password", {email});
};
const resetPasswordApi = (email, otp, newPassword) => {
  return axios.post("v1/auth/reset-password", {
    email,
    otp,
    newPassword,
  });
};
export {
    loginApi,
    registerApi,
    forgotPasswordApi,
    resetPasswordApi
}
